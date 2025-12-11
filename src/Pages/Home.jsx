import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'
import HeroBanner from '../Components/HeroSection'
import OurProducts from '../Components/OurProduct'
import HowItWorks from '../Components/HowItWorks'
import CustomerFeedbackCarousel from '../Components/CustomerFeedBack'
import FeaturedCategories from '../Components/FeaturedCatogories'
import WhyChooseUs from '../Components/WhyChooseUs'

export default function Home() {
  return (
    <div>
        <Navbar></Navbar>
    <HeroBanner></HeroBanner>
    <OurProducts></OurProducts>
    <HowItWorks></HowItWorks>
    <CustomerFeedbackCarousel></CustomerFeedbackCarousel>
    <FeaturedCategories></FeaturedCategories>
    <WhyChooseUs></WhyChooseUs>
        <Footer></Footer>
    </div>
  )
}
