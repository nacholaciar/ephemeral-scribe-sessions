import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Share2, Clock, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [sessionName, setSessionName] = useState("");
  const navigate = useNavigate();

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const createNewSession = () => {
    const sessionId = sessionName.trim() || generateSessionId();
    navigate(`/editor/${sessionId}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createNewSession();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <Edit3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Editor Compartido
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crea documentos con formato rico y compártelos instantáneamente. 
            Como un pastebin pero con todas las características de un editor moderno.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-16">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Nueva Sesión
              </CardTitle>
              <CardDescription>
                Crea un documento que podrás compartir al instante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Nombre de la sesión (opcional)"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Si no especificas un nombre, se generará uno automáticamente
                </p>
              </div>
              <Button 
                onClick={createNewSession} 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                size="lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Editor
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Edit3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Editor Rico</h3>
            <p className="text-muted-foreground text-sm">
              Formato de texto, enlaces, listas, imágenes y más con una interfaz intuitiva
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compartir Fácil</h3>
            <p className="text-muted-foreground text-sm">
              Comparte la URL y accede desde cualquier dispositivo al instante
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sesiones Temporales</h3>
            <p className="text-muted-foreground text-sm">
              Los documentos se mantienen activos durante tu sesión de trabajo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
