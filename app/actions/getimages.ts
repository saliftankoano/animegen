"use server";

export async function getImages() {
  const response = await fetch("http://localhost:3000/api/listall");
  const data = await response.json();
  console.log(data.images);
  return data;
}
