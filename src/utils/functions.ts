export const calculateMaxLineWidth = (percent: number) => {
    const screenWidth = window.innerWidth;
    // Example logic to calculate maxLineWidth based on screen width
    // Adjust the calculation as needed
    return screenWidth * percent; // For example, 80% of the screen width
  };

export const ScrollSmoothToView = (id: string) => {
  document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
}
