import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection
      onLocationDetect={(coords) => console.log("Location detected:", coords)}
      onSearch={(query) => console.log("Search:", query)}
    />
  );
}
