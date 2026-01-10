import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'
import HeroBanner from '../Components/HeroSection'
import OurProducts from '../Components/OurProduct'
import HowItWorks from '../Components/HowItWorks'
import CustomerFeedbackCarousel from '../Components/CustomerFeedBack'
import FeaturedCategories from '../Components/FeaturedCatogories'
import WhyChooseUs from '../Components/WhyChooseUs'
import FeaturedBrands from '../Components/FeaturedBrands'
import StatisticsSection from '../Components/StatisticsSection'
import SpecialOffers from '../Components/SpecialOffers'
import NewsletterSection from '../Components/NewsletterSection'
import FAQSection from '../Components/FAQSection'

export default function Home() {
  return (
    <div className="dark:bg-gray-900">
      <HeroBanner></HeroBanner>
      <OurProducts></OurProducts>
      <HowItWorks></HowItWorks>
      <CustomerFeedbackCarousel></CustomerFeedbackCarousel>
      <FeaturedCategories></FeaturedCategories>
      <WhyChooseUs></WhyChooseUs>
      <FeaturedBrands></FeaturedBrands>
      <StatisticsSection></StatisticsSection>
      <SpecialOffers></SpecialOffers>
      <FAQSection></FAQSection>
      <NewsletterSection></NewsletterSection>
    </div>
  )
}
