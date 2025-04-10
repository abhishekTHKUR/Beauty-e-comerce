import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ImageCarousel=()=>{
    return (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={2000}
          dynamicHeight={false}
        >
          <div>
            <Image src="/images/slide1.jpg" alt="Beauty Slide 1" width={1200} height={700} />
          </div>
          <div>
            <Image src="/images/slide.jpg" alt="Beauty Slide 2" width={1200} height={700} />
          </div>
          <div>
            <Image src="/images/slide2.jpg" alt="Beauty Slide 3" width={1200} height={700} />
          </div>
        </Carousel>
      );
    };
    
    export default ImageCarousel;
