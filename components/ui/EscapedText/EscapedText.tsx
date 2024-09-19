// app/components/ui/EscapedText.tsx
interface EscapedTextProps {
  text: string;
}

export default function EscapedText({ text }: EscapedTextProps) {
  return <p dangerouslySetInnerHTML={{ __html: text }} />;
}
