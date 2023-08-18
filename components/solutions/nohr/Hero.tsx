import Image from "next/image";
import icon from '@/assets/images/solutions/fintech/hero/639217d589d6f45940232133Mark.svg'
import Link from "next/link"; 
import videojs from 'video.js';
import { useRef } from "react";
import ModalVideo from '@/components/solutions/nohr/ModalVideo'
import heroImg from '@/components/solutions/nohr/assets/rafiki.svg'

 

const Hero = ( ) => {
    const playerRef =  useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "https://drive.google.com/uc?export=download&id=1tCpC4j2irpWPL3GF9u8Vo4dj8MXEDY60",
          type: 'video/mp4'
        }]
      };
    
      const handlePlayerReady = (player:any) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
      };

    return (
        <section className="px-5 bg-brand-green/20">
            <div className="max-w-5xl md:px-12 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between py-10 lg:py-14">
                <div className="relative w-full font-outfit text-center lg:text-start mt-10 lg:mt-0">
                    <div className="flex gap-3 items-center mb-6">
                        <Image src={icon} alt="" />
                        <p className="text-2xl">Enterprise</p>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-42 font-semibold text-brand-dark">
                      Effortlessly manage high-volume recruitment with NoHR AI
                    </h1>
                    <p className="text-lg md:text-xl text-brand-gray-300 mt-3 md:mt-5">
                      Enterprises can automate their recruitment process with NoHR, saving time and resources by allowing AI to handle candidate interactions and interview scheduling.
                    </p>
                    <div className="flex gap-2">

                        <Link
                            href="/signin"
                            className="group w-fit mx-auto lg:mx-0 flex items-center space-x-2.5 bg-brand-green font-semibold text-white rounded-lg hover:bg-inherit hover:text-brand-green border border-brand-green transition duration-200 px-6 py-2.5 md:py-3.5 md:px-9 mt-6 md:mt-9"
                        >
                            <span>Start Free trial</span>

                        </Link>
                         
                            <ModalVideo options={videoJsOptions} onReady={handlePlayerReady} /> 

                    </div>
                </div>
                <div className="w-3/4">
                    <Image src={heroImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
