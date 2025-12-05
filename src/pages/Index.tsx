import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Role = 'climatologist' | 'biologist' | 'engineer' | 'journalist' | null;
type Section = 'start' | 'intro' | 'map' | 'missions' | 'about' | 'ai' | 'profile';
type MissionStep = 'intro' | 'task1' | 'task2' | 'result';

interface Character {
  name: string;
  role: Role;
  avatar: string;
}

const roles = [
  {
    id: 'climatologist' as Role,
    title: 'Климатолог',
    icon: 'Thermometer',
    focus: 'Температурные данные, CO₂, метан, прогнозы климата',
    color: 'bg-red-500'
  },
  {
    id: 'biologist' as Role,
    title: 'Биолог',
    icon: 'Beef',
    focus: 'Популяции животных, миграция, экосистемы',
    color: 'bg-green-500'
  },
  {
    id: 'engineer' as Role,
    title: 'Инженер',
    icon: 'Cog',
    focus: 'Технологии, энергия, инфраструктура, устойчивые решения',
    color: 'bg-blue-500'
  },
  {
    id: 'journalist' as Role,
    title: 'Журналист',
    icon: 'Newspaper',
    focus: 'Человеческие истории, влияние на общество, публичные данные',
    color: 'bg-purple-500'
  }
];

const avatars = ['👨‍🔬', '👩‍🔬', '🧑‍💻', '👨‍🚀', '👩‍🚀', '🧑‍🎓'];

const iceData = [
  { year: 1925, area: 14.8, temp: -0.2 },
  { year: 1950, area: 14.5, temp: -0.1 },
  { year: 1975, area: 14.2, temp: 0.0 },
  { year: 2000, area: 13.1, temp: 0.4 },
  { year: 2025, area: 11.8, temp: 1.1 },
  { year: 2050, area: 9.2, temp: 2.0 }
];

const aiMessages = [
  { role: 'ai', text: 'Привет! Я Арктина 🤖 — твой виртуальный наставник в этой экспедиции.' },
  { role: 'ai', text: 'Чем могу помочь? Спроси меня о таянии льдов, популяции белых медведей или изменении климата!' }
];

export default function Index() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>('start');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState(avatars[0]);
  const [tempRole, setTempRole] = useState<Role>(null);
  const [missionStep, setMissionStep] = useState<MissionStep>('intro');
  const [missionAnswers, setMissionAnswers] = useState({ area2000: '', area2025: '' });
  const [aiChat, setAiChat] = useState(aiMessages);
  const [aiInput, setAiInput] = useState('');
  const [completedMissions, setCompletedMissions] = useState(0);

  const getRoleData = () => {
    switch (character?.role) {
      case 'climatologist':
        return { metric: 'Температура', value: '+1.1°C', trend: '+0.08°C/год' };
      case 'biologist':
        return { metric: 'Популяция медведей', value: '~22,000', trend: '-2.5%/год' };
      case 'engineer':
        return { metric: 'Энергопотребление', value: '12.4 ТВт·ч', trend: '+3.1%/год' };
      case 'journalist':
        return { metric: 'Жителей Арктики', value: '4 млн чел', trend: '+0.5%/год' };
      default:
        return { metric: 'Площадь льда', value: '11.8 млн км²', trend: '-3.2%/год' };
    }
  };

  const handleAiSubmit = () => {
    if (!aiInput.trim()) return;
    
    setAiChat([...aiChat, 
      { role: 'user', text: aiInput },
      { role: 'ai', text: getAiResponse(aiInput) }
    ]);
    setAiInput('');
  };

  const getAiResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('лёд') || q.includes('лед') || q.includes('таян')) {
      return 'Морской лёд в Арктике тает со скоростью примерно -0.052 млн км² в год. С 1925 года площадь льда сократилась на 20%. Это влияет на альбедо планеты и ускоряет потепление.';
    }
    if (q.includes('медвед') || q.includes('животн')) {
      return 'Популяция белых медведей сокращается на ~2.5% в год из-за потери среды обитания. Им приходится мигрировать на большие расстояния, что увеличивает энергозатраты.';
    }
    if (q.includes('климат') || q.includes('температур')) {
      return 'Температура в Арктике растёт в 2 раза быстрее, чем в среднем по планете. В 2025 году аномалия составляет +1.1°C относительно базового периода.';
    }
    return 'Интересный вопрос! Попробуй переключить временные слои на карте или начни миссию "Таяние льдов" для более детального изучения.';
  };

  const calculateMissionResult = () => {
    const area2000 = parseFloat(missionAnswers.area2000);
    const area2025 = parseFloat(missionAnswers.area2025);
    
    if (!area2000 || !area2025) return { correct: false, message: 'Введите оба значения' };
    
    const correctArea2000 = 13.1;
    const correctArea2025 = 11.8;
    
    const diff2000 = Math.abs(area2000 - correctArea2000);
    const diff2025 = Math.abs(area2025 - correctArea2025);
    
    if (diff2000 < 0.5 && diff2025 < 0.5) {
      return { 
        correct: true, 
        message: 'Отлично! Ты точно определил площадь льда.',
        rate: (1.3 / 25),
        zeroYear: 2252
      };
    }
    
    return { 
      correct: false, 
      message: 'Попробуй ещё раз. Подсказка: смотри на график внимательнее!'
    };
  };

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
              className="text-lg px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-white border-0 animate-scale-in"
              style={{ animationDelay: '0.5s' }}
              onClick={() => setCurrentSection('intro')}
            >
              <Icon name="Rocket" size={24} className="mr-2" />
              Начать экспедицию
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all">
              <CardHeader>
                <Icon name="Users" className="text-cyan-300 mb-2" size={32} />
                <CardTitle className="text-white">4 роли</CardTitle>
                <CardDescription className="text-blue-200">Выберите уникального персонажа</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all">
              <CardHeader>
                <Icon name="Target" className="text-cyan-300 mb-2" size={32} />
                <CardTitle className="text-white">Миссии</CardTitle>
                <CardDescription className="text-blue-200">Интерактивные задания</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all">
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

          <Card className="border-blue-200 animate-scale-in">
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
                      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                        tempRole === role.id ? 'border-2 border-blue-500 shadow-lg' : 'border-2 border-transparent'
                      }`}
                      onClick={() => setTempRole(role.id)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`${role.color} p-2 rounded-lg`}>
                            <Icon name={role.icon as any} className="text-white" size={20} />
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
                className="w-full text-lg"
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

  const roleData = getRoleData();
  const currentRole = roles.find(r => r.id === character?.role);
  const currentData = iceData.find(d => d.year === selectedYear) || iceData[4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50 animate-slide-in-left">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="Snowflake" className="text-cyan-600 animate-bounce-soft" size={24} />
              <span className="font-bold text-blue-950 text-lg">Ледяной Хроникер</span>
              {character && (
                <div className="flex items-center gap-2 animate-scale-in">
                  <span className="text-2xl">{character.avatar}</span>
                  <span className="text-sm font-medium text-blue-900">{character.name}</span>
                  {currentRole && (
                    <Badge className={`${currentRole.color} text-white border-0 ml-2`}>
                      {currentRole.title}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant={currentSection === 'map' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('map')}
                className="transition-all hover:scale-105"
              >
                <Icon name="Map" size={16} className="mr-1" />
                Карта
              </Button>
              <Button 
                variant={currentSection === 'missions' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('missions')}
                className="transition-all hover:scale-105"
              >
                <Icon name="Target" size={16} className="mr-1" />
                Миссии
              </Button>
              <Button 
                variant={currentSection === 'ai' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('ai')}
                className="transition-all hover:scale-105"
              >
                <Icon name="Bot" size={16} className="mr-1" />
                ИИ-помощник
              </Button>
              <Button 
                variant={currentSection === 'profile' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('profile')}
                className="transition-all hover:scale-105"
              >
                <Icon name="User" size={16} className="mr-1" />
                Профиль
              </Button>
              <Button 
                variant={currentSection === 'about' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('about')}
                className="transition-all hover:scale-105"
              >
                <Icon name="Info" size={16} className="mr-1" />
                О проекте
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentSection === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ТЕКУЩИЙ ГОД</CardDescription>
                  <CardTitle className="text-3xl font-mono">{selectedYear}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">{roleData.metric}</CardDescription>
                  <CardTitle className="text-3xl font-mono">{roleData.value}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{roleData.trend}</p>
                </CardHeader>
              </Card>
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ПЛОЩАДЬ ЛЬДА</CardDescription>
                  <CardTitle className="text-3xl font-mono">{currentData.area} млн км²</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">-{((14.8 - currentData.area) / 14.8 * 100).toFixed(1)}% с 1925</p>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-blue-200 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" size={20} />
                  Интерактивная карта Арктики
                </CardTitle>
                <CardDescription>Временные слои и данные мониторинга</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ice" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="ice" className="text-xs">Морской лёд</TabsTrigger>
                    <TabsTrigger value="temp" className="text-xs">Температура</TabsTrigger>
                    <TabsTrigger value="animals" className="text-xs">Животные</TabsTrigger>
                    <TabsTrigger value="human" className="text-xs">Активность</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ice" className="mt-6">
                    <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-blue-300 overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                      <div className="relative text-center animate-fade-in">
                        <Icon name="Snowflake" size={64} className="text-blue-400 mx-auto mb-4 animate-float" />
                        <p className="text-lg font-semibold text-blue-900">Карта морского льда</p>
                        <p className="text-sm text-blue-700 font-mono mt-2">Год: {selectedYear}</p>
                        <p className="text-sm text-blue-700 font-mono">Покрытие: {currentData.area} млн км²</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="temp" className="mt-6">
                    <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-red-300">
                      <div className="relative text-center animate-fade-in">
                        <Icon name="Thermometer" size={64} className="text-red-500 mx-auto mb-4 animate-bounce-soft" />
                        <p className="text-lg font-semibold text-red-900">Температурные аномалии</p>
                        <p className="text-sm text-red-700 font-mono mt-2">Год: {selectedYear}</p>
                        <p className="text-sm text-red-700 font-mono">Аномалия: {currentData.temp > 0 ? '+' : ''}{currentData.temp}°C</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="animals" className="mt-6">
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-green-300">
                      <div className="relative text-center animate-fade-in">
                        <Icon name="Beef" size={64} className="text-green-600 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-green-900">Популяции животных</p>
                        <p className="text-sm text-green-700 mt-2">🐻 Белые медведи • 🦭 Моржи • 🐟 Тюлени</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="human" className="mt-6">
                    <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-purple-300">
                      <div className="relative text-center animate-fade-in">
                        <Icon name="Factory" size={64} className="text-purple-600 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-purple-900">Человеческая активность</p>
                        <p className="text-sm text-purple-700 mt-2">⛽ Добыча • 🚢 Судоходство • 🏭 Станции</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-muted-foreground">ВРЕМЕННАЯ ШКАЛА</span>
                    <span className="text-sm font-mono font-semibold text-primary">{selectedYear}</span>
                  </div>
                  <div className="flex gap-2">
                    {iceData.map((data) => (
                      <Button
                        key={data.year}
                        variant={selectedYear === data.year ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedYear(data.year)}
                        className="flex-1 font-mono text-xs transition-all hover:scale-105"
                      >
                        {data.year}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'missions' && missionStep === 'intro' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-blue-200 animate-slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" size={24} />
                  Миссии исследователя
                </CardTitle>
                <CardDescription>Интерактивные кейсы для изучения Арктики</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-blue-500 p-3 rounded-lg animate-float">
                      <Icon name="Snowflake" className="text-white" size={24} />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300">МИССИЯ #1</Badge>
                  </div>
                  <CardTitle className="text-xl">❄️ Таяние льдов</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Исследуйте динамику морского льда и рассчитайте скорость таяния
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="font-mono text-sm text-blue-900 mb-2">ДАННЫЕ АНАЛИЗА</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>2000 год:</span>
                          <span className="font-mono font-semibold">13.1 млн км²</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>2025 год:</span>
                          <span className="font-mono font-semibold">11.8 млн км²</span>
                        </div>
                        <div className="h-px bg-blue-300 my-2" />
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Скорость таяния:</span>
                          <span className="font-mono text-red-600">-0.052 млн км²/год</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => setMissionStep('task1')}>
                      <Icon name="Play" size={16} className="mr-2" />
                      Начать миссию
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-300 hover:shadow-lg transition-all opacity-60 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Icon name="Beef" className="text-white" size={24} />
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 border-gray-300">СКОРО</Badge>
                  </div>
                  <CardTitle className="text-xl">🐻 Медвежий след</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Анализируйте миграцию белых медведей
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" disabled>
                    <Icon name="Lock" size={16} className="mr-2" />
                    Заблокировано
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentSection === 'missions' && missionStep === 'task1' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Button variant="ghost" className="mb-4" onClick={() => setMissionStep('intro')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К списку миссий
            </Button>
            
            <Card className="border-blue-300 animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Snowflake" className="text-blue-500" size={28} />
                      Миссия: Таяние льдов
                    </CardTitle>
                    <CardDescription className="mt-2">Шаг 1 из 2</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">В процессе</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 animate-slide-in-left">
                  <h3 className="font-semibold text-lg mb-3 text-blue-950">📊 Задание 1: Определите площадь льда</h3>
                  <p className="text-blue-900 mb-4">
                    Изучите график изменения площади морского льда в Арктике. Определите площадь льда в 2000 и 2025 годах.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="h-48 flex items-end justify-around gap-2">
                      {iceData.map((d) => (
                        <div key={d.year} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-400 rounded-t transition-all hover:bg-blue-500 animate-scale-in"
                            style={{ 
                              height: `${(d.area / 15) * 100}%`,
                              animationDelay: `${iceData.indexOf(d) * 100}ms`
                            }}
                          />
                          <span className="text-xs font-mono mt-2">{d.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area2000">Площадь в 2000 году (млн км²)</Label>
                      <Input 
                        id="area2000"
                        type="number"
                        step="0.1"
                        placeholder="13.1"
                        value={missionAnswers.area2000}
                        onChange={(e) => setMissionAnswers({...missionAnswers, area2000: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area2025">Площадь в 2025 году (млн км²)</Label>
                      <Input 
                        id="area2025"
                        type="number"
                        step="0.1"
                        placeholder="11.8"
                        value={missionAnswers.area2025}
                        onChange={(e) => setMissionAnswers({...missionAnswers, area2025: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setMissionStep('result')}
                  disabled={!missionAnswers.area2000 || !missionAnswers.area2025}
                >
                  <Icon name="ArrowRight" size={20} className="mr-2" />
                  Проверить ответ
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'missions' && missionStep === 'result' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="border-blue-300 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="CheckCircle" className="text-green-500" size={28} />
                  Результат миссии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(() => {
                  const result = calculateMissionResult();
                  return (
                    <>
                      <div className={`p-6 rounded-lg border-2 ${result.correct ? 'bg-green-50 border-green-300' : 'bg-orange-50 border-orange-300'} animate-slide-in-left`}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name={result.correct ? 'CheckCircle' : 'AlertCircle'} 
                                className={result.correct ? 'text-green-600' : 'text-orange-600'} 
                                size={32} />
                          <h3 className="font-semibold text-xl">{result.correct ? 'Отлично!' : 'Попробуй ещё раз'}</h3>
                        </div>
                        <p className={result.correct ? 'text-green-900' : 'text-orange-900'}>{result.message}</p>
                      </div>

                      {result.correct && (
                        <>
                          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 animate-slide-in-right">
                            <h3 className="font-semibold text-lg mb-4 text-blue-950">📈 Итоговые расчёты</h3>
                            <div className="space-y-3 font-mono text-sm">
                              <div className="flex justify-between">
                                <span>Разница площади (2000-2025):</span>
                                <span className="font-semibold">-1.3 млн км²</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Скорость таяния:</span>
                                <span className="font-semibold text-red-600">-0.052 млн км²/год</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Прогноз полного таяния:</span>
                                <span className="font-semibold text-orange-600">~2252 год</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200 animate-fade-in">
                            <h3 className="font-semibold text-lg mb-2">🏆 Миссия выполнена!</h3>
                            <p className="text-muted-foreground mb-4">
                              Ты получил бейдж "Ледяной исследователь" и разблокировал следующие миссии.
                            </p>
                            <Progress value={100} className="mb-4" />
                          </div>

                          <div className="flex gap-3">
                            <Button 
                              size="lg" 
                              className="flex-1"
                              onClick={() => {
                                setMissionStep('intro');
                                setCompletedMissions(completedMissions + 1);
                                setMissionAnswers({ area2000: '', area2025: '' });
                              }}
                            >
                              <Icon name="List" size={20} className="mr-2" />
                              К списку миссий
                            </Button>
                            <Button 
                              size="lg" 
                              variant="outline"
                              className="flex-1"
                              onClick={() => setCurrentSection('profile')}
                            >
                              <Icon name="User" size={20} className="mr-2" />
                              Мой профиль
                            </Button>
                          </div>
                        </>
                      )}

                      {!result.correct && (
                        <Button 
                          size="lg" 
                          className="w-full"
                          onClick={() => setMissionStep('task1')}
                        >
                          <Icon name="RotateCcw" size={20} className="mr-2" />
                          Попробовать снова
                        </Button>
                      )}
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'ai' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="border-cyan-300 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Bot" className="text-cyan-600 animate-bounce-soft" size={28} />
                  ИИ-помощник Арктина
                </CardTitle>
                <CardDescription>Задавай вопросы о климате, животных и экологии Арктики</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 h-96 overflow-y-auto mb-4 border border-cyan-200">
                  <div className="space-y-4">
                    {aiChat.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex gap-3 animate-slide-in-left`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className={`p-2 rounded-lg ${msg.role === 'ai' ? 'bg-cyan-500' : 'bg-blue-500'}`}>
                          <Icon name={msg.role === 'ai' ? 'Bot' : 'User'} className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold mb-1 ${msg.role === 'ai' ? 'text-cyan-900' : 'text-blue-900'}`}>
                            {msg.role === 'ai' ? 'Арктина' : character?.name}
                          </p>
                          <p className="text-sm text-gray-700">{msg.text}</p>
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
                    className="flex-1"
                  />
                  <Button onClick={handleAiSubmit} disabled={!aiInput.trim()}>
                    <Icon name="Send" size={20} />
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 mb-2 font-semibold">💡 Попробуй спросить:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Почему тают льды?', 'Сколько белых медведей?', 'Как меняется климат?'].map((q) => (
                      <Button 
                        key={q} 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setAiInput(q);
                          setTimeout(() => handleAiSubmit(), 100);
                        }}
                        className="text-xs"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'profile' && character && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="border-blue-200 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <span className="text-4xl animate-bounce-soft">{character.avatar}</span>
                  {character.name}
                </CardTitle>
                <CardDescription>Профиль исследователя</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <Label className="text-sm text-muted-foreground">РОЛЬ</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {currentRole && (
                          <>
                            <div className={`${currentRole.color} p-2 rounded-lg`}>
                              <Icon name={currentRole.icon as any} className="text-white" size={20} />
                            </div>
                            <span className="font-semibold text-lg">{currentRole.title}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Label className="text-sm text-muted-foreground">ВЫПОЛНЕНО МИССИЙ</Label>
                      <p className="text-3xl font-bold text-green-700 mt-2">{completedMissions} / 4</p>
                      <Progress value={(completedMissions / 4) * 100} className="mt-2" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200">
                    <h3 className="font-semibold text-lg mb-3">🏆 Достижения</h3>
                    <div className="space-y-2">
                      {completedMissions > 0 && (
                        <Badge className="mr-2 bg-blue-500 animate-scale-in">❄️ Ледяной исследователь</Badge>
                      )}
                      {completedMissions === 0 && (
                        <p className="text-sm text-muted-foreground">Выполни первую миссию, чтобы получить бейдж!</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-lg mb-3">📊 Статистика</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-700">{completedMissions}</p>
                      <p className="text-xs text-muted-foreground">Миссий</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-cyan-700">{aiChat.length - 2}</p>
                      <p className="text-xs text-muted-foreground">Вопросов ИИ</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-700">1</p>
                      <p className="text-xs text-muted-foreground">Бейджей</p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (confirm('Вы уверены, что хотите создать нового персонажа?')) {
                      setCharacter(null);
                      setCurrentSection('intro');
                      setCompletedMissions(0);
                      setMissionStep('intro');
                      setMissionAnswers({ area2000: '', area2025: '' });
                    }
                  }}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Создать нового персонажа
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'about' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <Card className="border-blue-200 animate-slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Icon name="Info" size={28} />
                  О проекте
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Интерактивный симулятор арктической экспедиции
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-blue-950">Миссия проекта</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    «Ледяной Хроникер» — это интерактивный веб-симулятор, позволяющий пользователям 
                    пройти виртуальную экспедицию по Арктике, исследуя изменения за последние 100 лет 
                    и прогнозируя будущие сценарии.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <Icon name="Target" className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Интерактивные миссии</h4>
                    <p className="text-sm text-muted-foreground">
                      Выполняйте задания по изучению климата
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <Icon name="Map" className="text-cyan-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Временная карта</h4>
                    <p className="text-sm text-muted-foreground">
                      Арктика в разные эпохи (1925-2050)
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <Icon name="Users" className="text-green-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">4 роли персонажей</h4>
                    <p className="text-sm text-muted-foreground">
                      Каждый с уникальным фокусом
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <Icon name="Bot" className="text-purple-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">ИИ-наставник</h4>
                    <p className="text-sm text-muted-foreground">
                      Арктина ответит на вопросы
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 animate-slide-in-right">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <Icon name="Send" className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Присоединяйся к сообществу</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Обсуждай экологию, делись результатами и общайся с другими исследователями
                      </p>
                      <a 
                        href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button>
                          <Icon name="Send" size={16} className="mr-2" />
                          Telegram сообщество
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-white/90 backdrop-blur-sm border-t border-blue-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              ARCTIC CHRONICLE PROJECT © 2025 • Путешествие сквозь время
            </p>
            <a 
              href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-500 transition-colors"
            >
              <Icon name="Send" size={16} />
              <span className="text-sm">Telegram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
