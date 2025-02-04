import React from 'react'
import aboutImg from "../../assets/images/about.png"
import aboutCardImg from "../../assets/images/about-card.png"
import { Link } from 'react-router-dom'

const About = () => {
  return <section>
    <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
            {/* ============= About image ================= */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 oredr-2 lg:order-1">
                <img src={aboutImg} alt="" />
                <div className="absolute z-20 bottom-4 w-[200px] md:w-[200px] right-[-30%] lg:right-[22%] md:right-[-7%]">
                    <img src={aboutCardImg} alt="" />
                </div>
            </div>

            {/* ============= About image ================= */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                <h2 className="heading">Proud to be one of the nations best</h2>
                <p className="text__para">For 30 years in a row, India News and World Report has reccognized us as one of the best hospitals in the nation and #1 in Gujarat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, saepe.</p>
                <p className="text__para mt-[30px]">For 30 years in a row, India News and World Report has reccognized us as one of the best hospitals in the nation and #1 in Gujarat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, saepe.</p>
                <Link to="/"><button className="btn">Learn More</button></Link>
            </div>




        </div>
    </div>
  </section>
}

export default About
