import { useState } from 'react';

interface AccordionProps {
  head: React.ReactNode,
  body: React.ReactNode,
}

export default function Accordion({
  head,
  body,
}: AccordionProps) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setActive(!active)}
        className={`
        cursor-pointer
        border-none
        text-left
        outline-none
        text-lg
        flex
        w-full
        justify-between
        items-center
        px-5
        py-2
        bg-indigo-100
        hover:bg-indigo-800
        hover:text-white
        hover:scale-105
        duration-150
        ${active && 'bg-indigo-800'}
        ${active && 'text-white'}
        `}
      >
        {head}
        <div
          className="
          ml-5
          text-xs
          "
        >
          ▼
        </div>
      </div>
      <div
        className={`
        px-5
        bg-gray-200
        overflow-hidden
        ${active ? 'block' : 'hidden'}
        `}
      >
        {body}
      </div>
    </div>
  )
}
