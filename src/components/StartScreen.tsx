import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Role {
  id: 'climatologist' | 'biologist' | 'engineer' | 'journalist';
  title: string;
  icon: string;
  focus: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface StartScreenProps {
  currentSection: 'start' | 'intro';
  character: { name: string; role: string; avatar: string } | null;
  roles: Role[];
  avatars: string[];
  tempName: string;
  tempAvatar: string;
  tempRole: string | null;
  setTempName: (name: string) => void;
  setTempAvatar: (avatar: string) => void;
  setTempRole: (role: any) => void;
  setCurrentSection: (section: any) => void;
  setCharacter: (character: any) => void;
}

export default function StartScreen({
  currentSection,
  character,
  roles,
  avatars,
  tempName,
  tempAvatar,
  tempRole,
  setTempName,
  setTempAvatar,
  setTempRole,
  setCurrentSection,
  setCharacter
}: StartScreenProps) {
  if (currentSection === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-40 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse-slow" />
        </div>
        
        <div className="max-w-4xl w-full animate-fade-in relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-scale-in">
              <Icon name="Snowflake" className="text-cyan-300 animate-bounce-soft" size={28} />
              <span className="font-mono text-base text-white tracking-wider">ARCTIC CHRONICLE PROJECT</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-slide-in-left">
              Ледяной Хроникер
            </h1>
            <p className="text-2xl text-cyan-100 max-w-2xl mx-auto mb-8 animate-slide-in-right">
              Путешествие сквозь время Арктики
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Исследуйте, как менялась Арктика за последние 100 лет. Выполняйте миссии, анализируйте данные 
              и принимайте решения, которые повлияют на будущее полярного региона.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-white border-0 animate-scale-in shadow-lg shadow-cyan-500/50"
              style={{ animationDelay: '0.5s' }}
              onClick={() => setCurrentSection('intro')}
            >
              <Icon name="Rocket" size={24} className="mr-2" />
              Начать экспедицию
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <CardHeader>
                <Icon name="Users" className="text-cyan-300 mb-2" size={32} />
                <CardTitle className="text-white">4 роли</CardTitle>
                <CardDescription className="text-blue-200">Выберите уникального персонажа</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <CardHeader>
                <Icon name="Target" className="text-cyan-300 mb-2" size={32} />
                <CardTitle className="text-white">Миссии</CardTitle>
                <CardDescription className="text-blue-200">Интерактивные задания</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <CardHeader>
                <Icon name="Bot" className="text-cyan-300 mb-2" size={32} />
                <CardTitle className="text-white">ИИ-помощник</CardTitle>
                <CardDescription className="text-blue-200">Арктина всегда рядом</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <a 
              href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <Icon name="Send" size={20} />
              <span>Присоединяйся к сообществу в Telegram</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'intro' && !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full animate-fade-in">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => setCurrentSection('start')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4 animate-slide-in-left">
              Создайте своего персонажа
            </h2>
            <p className="text-lg text-blue-700 animate-slide-in-right">
              Выберите имя, аватар и роль для экспедиции
            </p>
          </div>

          <Card className="border-blue-200 shadow-xl animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Профиль исследователя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Имя исследователя</Label>
                <Input 
                  id="name" 
                  placeholder="Например: Игорь Арктический"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Выберите аватар</Label>
                <div className="grid grid-cols-6 gap-3">
                  {avatars.map((av) => (
                    <button
                      key={av}
                      onClick={() => setTempAvatar(av)}
                      className={`text-4xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                        tempAvatar === av ? 'border-blue-500 bg-blue-50 scale-110' : 'border-gray-200'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Выберите роль</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {roles.map((role, idx) => (
                    <Card 
                      key={role.id}
                      className={`cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                        tempRole === role.id ? 'border-2 border-blue-500 shadow-lg' : 'border-2 border-transparent'
                      }`}
                      onClick={() => setTempRole(role.id)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`${role.color} p-3 rounded-lg shadow-md`}>
                            <Icon name={role.icon as any} className="text-white" size={24} />
                          </div>
                          <CardTitle className="text-lg">{role.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm mt-2">{role.focus}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg shadow-lg"
                disabled={!tempName || !tempRole}
                onClick={() => {
                  setCharacter({ name: tempName, role: tempRole, avatar: tempAvatar });
                  setCurrentSection('map');
                }}
              >
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Начать экспедицию
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
