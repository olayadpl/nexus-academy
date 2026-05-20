"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"

type ChatMessage = {
  id: string
  text: string
  time: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "a1",
    text: "¡Hola! Soy tu asistente. Preguntame sobre este recurso.",
    time: "Ahora",
  },
]

type SidebarAssistantProps = {
  scrollClass?: string
  showHeader?: boolean
}

export function SidebarAssistant({ scrollClass = "overflow-y-auto", showHeader = true }: SidebarAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [question, setQuestion] = useState("")

  const sendQuestion = () => {
    const value = question.trim()
    if (!value) return

    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, text: value, time: "Ahora" },
      {
        id: `a-${Date.now() + 1}`,
        text: "Entendido. Estoy analizando el contenido para responderte con mas contexto.",
        time: "Ahora",
      },
    ])
    setQuestion("")
  }

  return (
    <>
      {showHeader && (
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Chatbot</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Pregunta sobre el documento</p>
        </div>
      )}
      <div className={`flex-1 space-y-3 p-3 ${scrollClass}`}>
        {messages.map((message) => (
          <div key={message.id} className="rounded-xl bg-card/80 p-3 text-sm shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-3 w-3 text-primary" />
              </span>
              <span className="text-[11px]">Asistente</span>
            </div>
            <p className="leading-relaxed">{message.text}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="border-t p-3">
        <div className="flex items-center gap-2 rounded-xl border bg-card px-2 py-2">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                sendQuestion()
              }
            }}
            placeholder="Escribe tu pregunta..."
            className="h-8 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Escribe tu pregunta"
          />
          <Button size="icon" className="h-8 w-8 rounded-lg" onClick={sendQuestion} aria-label="Enviar pregunta">
            <svg />
          </Button>
        </div>
      </div>
    </>
  )
}
