export const languageOptions = [
    { id: "English", label: "English" },
    { id: "French", label: "French" },
    { id: "Arabic", label: "Arabic" },
    { id: "Spanish", label: "Spanish" },
    { id: "German", label: "German" },
  ];
  
  export const courseLevelOptions = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];
  
  export const courseCategories = [
    { id: "front-development", label: "Frontend Development" },
    { id: "backend-development", label: "Backend Development" },
    { id: "data-science", label: "Data Science" },
    { id: "data-analytics", label: "Data Analytics" },
    { id: "artificial-intelligence", label: "Artificial Intelligence" },
    { id: "cloud-computing", label: "Cloud Computing" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "mobile-development", label: "Mobile Development" },
  ];
  
  export const courseLandingPageFormControls = [
    {
      name: "title",
      label: "Title",
      componentType: "input",
      type: "text",
      placeholder: "Enter course title",
    },
    {
      name: "category",
      label: "Category",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseCategories,
    },
    {
      name: "level",
      label: "Level",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: courseLevelOptions,
    },
    {
      name: "primaryLanguage",
      label: "Primary Language",
      componentType: "select",
      type: "text",
      placeholder: "",
      options: languageOptions,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      componentType: "input",
      type: "text",
      placeholder: "Enter course subtitle",
    },
    {
      name: "description",
      label: "Description",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course description",
    },
    {
      name: "pricing",
      label: "Pricing",
      componentType: "input",
      type: "number",
      placeholder: "Enter course pricing",
    },
    {
      name: "objectives",
      label: "Objectives",
      componentType: "textarea",
      type: "text",
      placeholder: "Enter course objectives",
    },
    {
      name: "welcomeMessage",
      label: "Welcome Message",
      componentType: "textarea",
      placeholder: "Welcome message for students",
    },
  ];
  
  export const courseLandingInitialFormData = {
    title: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",
    pricing: "",
    objectives: "",
    welcomeMessage: "",
    image: "",
  };
  
  export const courseCurriculumInitialFormData = [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
    },
  ];
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const filterOptions = {
    category: courseCategories,
    level: courseLevelOptions,
    primaryLanguage: languageOptions,
  };