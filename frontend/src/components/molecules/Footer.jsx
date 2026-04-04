import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black/60 backdrop-blur">
      
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-center text-sm text-zinc-500">
        
        <p className="text-center leading-relaxed">
          © {new Date().getFullYear()} Zorvyn • Developed by{" "}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.linkedin.com/in/kshitijsingh07/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative font-medium text-zinc-300 hover:text-white transition-all duration-200 underline-offset-4 hover:underline"
              >
                Kshitij Singh
              </a>
            </TooltipTrigger>

            <TooltipContent
              side="top"
              className="bg-zinc-900 text-zinc-300 border border-zinc-800 shadow-lg"
            >
              View LinkedIn profile
            </TooltipContent>
          </Tooltip>
        </p>
      </div>
    </footer>
  );
}