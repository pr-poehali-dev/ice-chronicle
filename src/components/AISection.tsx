import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AISectionProps {
  aiChat: Array<{ role: string; text: string }>;
  aiInput: string;
  setAiInput: (input: string) => void;
  handleAiSubmit: () => void;
  character: any;
  currentRole: any;
}

export default function AISection({
  aiChat,
  aiInput,
  setAiInput,
  handleAiSubmit,
  character,
  currentRole
}: AISectionProps) {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-cyan-300 animate-scale-in shadow-xl h-full">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Bot" className="animate-bounce-soft" size={32} />
                Арктина - ИИ-помощник
              </CardTitle>
              <CardDescription className="text-cyan-50">
                Задавай вопросы о климате, животных и экологии Арктики
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 h-[500px] overflow-y-auto mb-4 border-2 border-cyan-200 shadow-inner">
                <div className="space-y-4">
                  {aiChat.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3 animate-slide-in-${msg.role === 'ai' ? 'left' : 'right'}`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className={`p-3 rounded-xl shadow-md ${msg.role === 'ai' ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
                        <Icon name={msg.role === 'ai' ? 'Bot' : 'User'} className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-semibold mb-1 ${msg.role === 'ai' ? 'text-cyan-900' : 'text-blue-900'}`}>
                          {msg.role === 'ai' ? 'Арктина' : character?.name}
                        </p>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input 
                  placeholder="Задай вопрос Арктине..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                  className="flex-1 border-2 border-cyan-200 focus:border-cyan-400"
                />
                <Button 
                  onClick={handleAiSubmit} 
                  disabled={!aiInput.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-blue-200 animate-scale-in shadow-lg" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Lightbulb" size={20} />
                Подсказки
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">💡 Попробуй спросить:</p>
              <div className="space-y-2">
                {[
                  'Почему тают льды?',
                  'Сколько белых медведей?',
                  'Как меняется климат?',
                  'Энергопотребление Арктики',
                  'Население региона'
                ].map((q) => (
                  <Button 
                    key={q} 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setAiInput(q);
                      setTimeout(() => handleAiSubmit(), 100);
                    }}
                    className="w-full text-xs justify-start hover:bg-cyan-50"
                  >
                    <Icon name="MessageSquare" size={14} className="mr-2" />
                    {q}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 animate-scale-in shadow-lg" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Sparkles" size={20} />
                Статистика чата
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Вопросов задано:</span>
                  <Badge className="bg-blue-100 text-blue-700">{Math.floor((aiChat.length - 2) / 2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Твоя роль:</span>
                  <Badge className={currentRole?.color}>{currentRole?.title}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
