"use server";

export async function getImages() {
  const response = await fetch("https://www.animegen.com/api/listall");
  const data = await response.json();
  //   console.log(data.images);
  return data;
}
