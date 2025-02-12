import {Grid2} from '@mui/material'; // Import Grid2
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from '@/components/ui/carousel';
import ProjectCard from '@/components/ProjectCard';

function AboutPage() {
  return (
    <div className="relative w-full px-4">
      <Carousel>
        <CarouselContent className="-ml-4 flex">
          {/* Wrapping the ProjectCards in CarouselItems while maintaining Grid2 layout */}
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 pl-4">
              <Grid2 container spacing={4} className="w-full flex justify-evenly">
                <ProjectCard />
              </Grid2>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          className="absolute -bottom-20 left-auto top-auto w-full justify-end gap-2"
          classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
          alwaysShow
        />
      </Carousel>
    </div>
  );
}

export default AboutPage;
