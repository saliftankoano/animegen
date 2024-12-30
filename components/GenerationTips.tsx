import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function GenerationTips() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Tips for better image generation</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Describe the scene and the character</li>
            <li>Include details about the setting, mood, and style</li>

            <li>Use adjectives to describe colors, textures, and lighting</li>
            <li>
              Mention the specific anime name and character for better results
            </li>
            <li>
              ⚠️ Avoid using multiple commas, semicolons, or other punctuation
              marks
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
