import { GeneratedImages } from "@/app/feed/page";
import { motion } from "framer-motion";
export default function Paginations({
  images,
  imagesPerPage,
  currentPage,
  setCurrentPage,
}: {
  images: GeneratedImages[];
  imagesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => (
        <motion.button
          className={`w-10 h-10 m-2 text-white rounded-md p-2 ${
            currentPage === page
              ? "bg-blue-700 dark:bg-yellow-500"
              : "dark:bg-blue-700 bg-yellow-500"
          }`}
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setCurrentPage(page);
            console.log("Current Page: ", currentPage);
            console.log("Moving to page: ", page);
            console.log("Images: ", images);
          }}
        >
          {page}
        </motion.button>
      ))}
    </div>
  );
}
