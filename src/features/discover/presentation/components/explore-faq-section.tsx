import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/core/ui/components/accordion"
import type { DiscoverFaqEntity } from "../../domain/entities/discover.entity"

interface ExploreFaqSectionProps {
  faq: DiscoverFaqEntity[]
}

export function ExploreFaqSection({ faq }: ExploreFaqSectionProps) {
  return (
    <div className="mt-14 flex flex-col gap-4 md:mt-20">
      <h2 className="flex items-center gap-2 text-xl font-semibold leading-[30px] md:text-[22px] md:leading-8">
        Preguntas frecuentes
      </h2>
      <div className="rounded-[20px] bg-muted p-6 shadow-[inset_0_0_0_1px_hsl(var(--border))] md:rounded-3xl md:p-8">
        <Accordion type="single" collapsible>
          {faq.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base font-semibold leading-6 md:text-lg md:leading-7">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-6">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
