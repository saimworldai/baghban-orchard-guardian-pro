
import { toast } from "sonner";

// Types for the Gemini API analysis
export interface GeminiAnalysisResult {
  imageExplanation: string;
  disease?: string;
  severity?: string;
  causes?: string[];
  prevention?: string;
  treatment?: string;
  cure?: string;
  sprayUsage?: string;
  isValidPlant: boolean;
}

// Function to analyze image using the Gemini API
export const analyzeImageWithGemini = async (imageBase64: string): Promise<GeminiAnalysisResult> => {
  try {
    // For demo purposes, we'll simulate the API call
    // In a real application, you would make an API call to the Google Gemini API
    console.log("Simulating Gemini API call with image data...");
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a deterministic result based on the image data hash
    let hash = 0;
    const sampleString = imageBase64.slice(0, 200);
    for (let i = 0; i < sampleString.length; i++) {
      hash = ((hash << 5) - hash) + sampleString.charCodeAt(i);
      hash = hash & hash;
    }
    
    // Simulate the validation of apple/leaf/branch/tree content
    const isValidPlant = Math.abs(hash) % 4 !== 0; // 75% chance of being valid
    
    if (!isValidPlant) {
      // For invalid plant images (not apple, leaf, branch or tree)
      return {
        imageExplanation: generateGenericImageDescription(hash),
        isValidPlant: false
      };
    }
    
    // For valid plant images
    const diseaseIndex = Math.abs(hash) % 5;
    
    // Simulate different disease analyses
    const diseases = [
      {
        disease: "Apple Scab",
        severity: "Moderate",
        causes: [
          "Fungal infection (Venturia inaequalis)",
          "High humidity and rainfall",
          "Poor air circulation in the orchard"
        ],
        prevention: "Plant resistant varieties. Prune trees to improve air circulation. Remove fallen leaves where the fungus overwinters. Maintain proper tree spacing.",
        treatment: "Apply fungicides like captan or myclobutanil at 7-10 day intervals during wet weather. For organic options, use sulfur or copper-based fungicides.",
        cure: "Once infection occurs, focus on preventing its spread. Remove heavily infected leaves and fruit. Continue fungicide applications according to schedule.",
        sprayUsage: "Apply first spray at green tip stage, then at pink bud, and continue at 7-10 day intervals during wet weather. Use 1-2 tablespoons of fungicide per gallon of water."
      },
      {
        disease: "Fire Blight",
        severity: "Severe",
        causes: [
          "Bacterial infection (Erwinia amylovora)",
          "Warm, wet spring weather",
          "Insect carriers like bees and aphids",
          "Presence of open blossoms"
        ],
        prevention: "Plant resistant varieties. Avoid excessive nitrogen fertilization which promotes susceptible growth. Prune trees during dormant season.",
        treatment: "Prune infected branches 12-15 inches below visible infection, sterilizing tools between cuts. Apply streptomycin sprays during bloom period in severe cases.",
        cure: "No complete cure exists once infected. Focus on removing infected tissue promptly and preventing spread. Copper sprays can help reduce bacterial populations.",
        sprayUsage: "Apply streptomycin at 4-5 day intervals during bloom. Use 1 teaspoon per gallon of water. Stop spraying two weeks after petal fall."
      },
      {
        disease: "Cedar Apple Rust",
        severity: "Mild to Moderate",
        causes: [
          "Fungal pathogen (Gymnosporangium juniperi-virginianae)",
          "Proximity to cedar or juniper trees (alternate host)",
          "Spring rainfall and moderate temperatures"
        ],
        prevention: "Plant resistant apple varieties. Remove nearby cedar or juniper trees if possible. Maintain good air circulation in the orchard.",
        treatment: "Apply fungicides like myclobutanil or mancozeb starting at pink bud stage and continuing through early summer. Space applications 7-10 days apart.",
        cure: "Remove and destroy infected leaves when possible. Continue preventative fungicide program according to schedule.",
        sprayUsage: "Begin applications at pink bud stage and continue at 7-10 day intervals until 2-3 weeks after petal fall. Use 2 tablespoons of fungicide per gallon of water."
      },
      {
        disease: "Powdery Mildew",
        severity: "Moderate",
        causes: [
          "Fungal infection (Podosphaera leucotricha)",
          "High humidity with moderate temperatures",
          "Poor air circulation",
          "Susceptible varieties"
        ],
        prevention: "Plant resistant varieties. Prune trees to improve air circulation. Avoid excessive nitrogen fertilization.",
        treatment: "Apply sulfur-based fungicides or potassium bicarbonate at first sign of infection. Continue applications at 7-14 day intervals.",
        cure: "Prune out heavily infected shoots. Apply horticultural oils with caution during growing season. Maintain fungicide schedule.",
        sprayUsage: "Apply when temperatures are between 65-80°F, avoiding application during hot weather. Use 2 tablespoons of sulfur or 1 tablespoon of potassium bicarbonate per gallon of water."
      },
      {
        disease: "Apple Mosaic Virus",
        severity: "Mild to Moderate",
        causes: [
          "Viral infection (Apple mosaic virus)",
          "Grafting with infected material",
          "Propagation from infected trees"
        ],
        prevention: "Use virus-free certified planting material. Inspect nursery stock before purchase. Maintain tree health to minimize symptom expression.",
        treatment: "No chemical treatments are effective against viruses. Remove severely affected trees to prevent spread.",
        cure: "No cure exists. Focus on tree health through proper nutrition and watering to minimize stress.",
        sprayUsage: "Not applicable for viral diseases. Focus instead on controlling insect vectors with appropriate insecticides if needed."
      }
    ];
    
    const selectedDisease = diseases[diseaseIndex];
    
    return {
      imageExplanation: generatePlantAnalysisDescription(hash, selectedDisease.disease),
      ...selectedDisease,
      isValidPlant: true
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    toast.error("Error analyzing image. Please try again.");
    throw error;
  }
};

// Helper function to generate plant analysis descriptions
function generatePlantAnalysisDescription(hash: number, diseaseName: string) {
  const plantTypes = ["apple leaf", "apple fruit", "apple tree branch", "young apple tree", "apple blossoms"];
  const plantType = plantTypes[Math.abs(hash) % plantTypes.length];
  
  const symptoms = [
    "yellowish spots",
    "dark brown lesions",
    "powdery white patches",
    "mottled appearance",
    "wilting and discoloration"
  ];
  const symptom = symptoms[Math.abs(hash) % symptoms.length];
  
  return `The image shows an ${plantType} displaying signs of ${diseaseName}. The characteristic symptoms include ${symptom} on the surface. This is a common disease affecting apple trees and requires prompt treatment to prevent spread throughout the orchard. Based on the visual indicators, this appears to be a ${Math.abs(hash) % 2 === 0 ? 'early' : 'moderate'} stage infection.`;
}

// Helper function to generate descriptions for non-plant images
function generateGenericImageDescription(hash: number) {
  const subjects = [
    "a landscape scene",
    "a building or structure",
    "a person or portrait",
    "an animal",
    "an everyday object",
    "a vehicle"
  ];
  
  const subject = subjects[Math.abs(hash) % subjects.length];
  
  return `The image appears to show ${subject}. This type of image cannot be analyzed for plant diseases. Please upload an image containing apples, leaves, branches, or trees for proper disease detection analysis.`;
}
