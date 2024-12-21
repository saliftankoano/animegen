import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS || "",
  },
});

export async function GET() {
  try {
    const bucketName = process.env.BUCKET_NAME || "";
    const listCommand = new ListObjectsV2Command({ Bucket: bucketName });
    const listResponse = await s3Client.send(listCommand);

    const images = await Promise.all(
      (listResponse.Contents || [])
        .sort((a, b) => (a.LastModified! > b.LastModified! ? -1 : 1))
        .map(async (item) => {
          try {
            const headCommand = new HeadObjectCommand({
              Bucket: bucketName,
              Key: item.Key!,
            });
            const headResponse = await s3Client.send(headCommand);

            return {
              url: `https://${bucketName}.s3.${process.env.S3_REGION}.amazonaws.com/${item.Key}`,
              metadata: headResponse.Metadata || {},
            };
          } catch (error) {
            console.error(`Failed to fetch metadata for ${item.Key}:`, error);
            return {
              key: item.Key,
              url: `https://${bucketName}.s3.${process.env.S3_REGION}.amazonaws.com/${item.Key}`,
              metadata: {},
            };
          }
        })
    );

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
