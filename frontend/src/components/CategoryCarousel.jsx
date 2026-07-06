import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Backend Enginneer"
];

const CategoryCarousel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        <span className="text-[#6A38C2]">Browse by</span> Category
      </h1>

      <Carousel className="w-full relative">
        <CarouselContent className="flex items-center justify-center gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#6A38C2] text-[#6A38C2] 
                font-semibold px-6 py-3 text-sm md:text-base
                bg-white from-[#6A38C2] to-[#9d4edd] 
                hover:text-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolutetop-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-[#6A38C2] hover:text-white transition-all" />
        <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-[#6A38C2] hover:text-white transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
