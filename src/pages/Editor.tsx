import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Copy, 
  Home, 
  Share2, 
  Save, 
  Clock,
  Eye,
  Edit3
} from "lucide-react";

const EditorPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [viewCount, setViewCount] = useState(1);

  useEffect(() => {
    // Simular carga del contenido de la sesión
    const loadSession = () => {
      const savedContent = localStorage.getItem(`session-${sessionId}`);
      const savedViewCount = localStorage.getItem(`views-${sessionId}`);
      
      if (savedContent) {
        try {
          setContent(savedContent);
        } catch (error) {
          console.error("Error parsing saved content:", error);
        }
      }

      if (savedViewCount) {
        const views = parseInt(savedViewCount) + 1;
        setViewCount(views);
        localStorage.setItem(`views-${sessionId}`, views.toString());
      } else {
        localStorage.setItem(`views-${sessionId}`, "1");
      }

      setIsLoading(false);
    };

    loadSession();
  }, [sessionId]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Auto-save
    localStorage.setItem(`session-${sessionId}`, newContent);
    setLastSaved(new Date());
  };

  const shareSession = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "¡Enlace copiado!",
        description: "La URL ha sido copiada al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar la URL automáticamente",
        variant: "destructive",
      });
    }
  };

  const saveManually = () => {
    if (content) {
      localStorage.setItem(`session-${sessionId}`, content);
      setLastSaved(new Date());
      toast({
        title: "Guardado",
        description: "El documento ha sido guardado",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Editor Compartido</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Eye className="h-3 w-3" />
                {viewCount} vista{viewCount !== 1 ? 's' : ''}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={saveManually}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar
              </Button>
              <Button
                onClick={shareSession}
                size="sm"
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Session Info */}
      <div className="container mx-auto px-4 py-4">
        <Card className="p-4 bg-muted/30 border-dashed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-medium">Sesión: {sessionId}</p>
                <p className="text-xs text-muted-foreground">
                  Comparte esta URL para colaborar: {window.location.href}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {lastSaved && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Guardado: {lastSaved.toLocaleTimeString()}
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={shareSession}
                className="gap-1 text-xs"
              >
                <Copy className="h-3 w-3" />
                Copiar URL
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 pb-8">
        <Card className="shadow-lg">
          <div className="p-6 min-h-[600px]">
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Escribe tu contenido aquí... (Implementación temporal mientras resolvemos Novel.sh)"
              className="min-h-[500px] resize-none border-0 focus-visible:ring-0 text-base"
            />
            <div className="mt-4 text-xs text-muted-foreground">
              ⚠️ Editor temporal - Estamos resolviendo la integración con Novel.sh
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditorPage;