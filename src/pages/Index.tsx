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
    color: 'bg-gradient-to-br from-red-500 to-orange-600',
    bgColor: 'from-red-50 to-orange-50',
    borderColor: 'border-red-300'
  },
  {
    id: 'biologist' as Role,
    title: 'Биолог',
    icon: 'Beef',
    focus: 'Популяции животных, миграция, экосистемы',
    color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-300'
  },
  {
    id: 'engineer' as Role,
    title: 'Инженер',
    icon: 'Cog',
    focus: 'Технологии, энергия, инфраструктура, устойчивые решения',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-300'
  },
  {
    id: 'journalist' as Role,
    title: 'Журналист',
    icon: 'Newspaper',
    focus: 'Человеческие истории, влияние на общество, публичные данные',
    color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-300'
  }
];

const avatars = ['👨‍🔬', '👩‍🔬', '🧑‍💻', '👨‍🚀', '👩‍🚀', '🧑‍🎓'];

const climateData = [
  { year: 1925, area: 14.8, temp: -0.2, bears: 25000, energy: 5.2, population: 2.8 },
  { year: 1950, area: 14.5, temp: -0.1, bears: 24500, energy: 6.8, population: 3.1 },
  { year: 1975, area: 14.2, temp: 0.0, bears: 24000, energy: 8.4, population: 3.5 },
  { year: 2000, area: 13.1, temp: 0.4, bears: 23000, energy: 10.2, population: 3.8 },
  { year: 2025, area: 11.8, temp: 1.1, bears: 22000, energy: 12.4, population: 4.0 },
  { year: 2050, area: 9.2, temp: 2.0, bears: 18000, energy: 15.6, population: 4.3 }
];

const roleMissions = {
  climatologist: {
    id: 'climate-mission',
    title: '🌡️ Глобальное потепление',
    description: 'Проанализируйте температурные аномалии и спрогнозируйте будущее',
    icon: 'Thermometer',
    color: 'red',
    tasks: [
      { question: 'Какая температурная аномалия была в 2000 году?', answer: '0.4', unit: '°C' },
      { question: 'Какая температурная аномалия в 2025 году?', answer: '1.1', unit: '°C' }
    ]
  },
  biologist: {
    id: 'bio-mission',
    title: '🐻 Популяция белых медведей',
    description: 'Изучите динамику популяции и факторы её снижения',
    icon: 'Beef',
    color: 'green',
    tasks: [
      { question: 'Сколько медведей было в 2000 году?', answer: '23000', unit: '' },
      { question: 'Сколько медведей в 2025 году?', answer: '22000', unit: '' }
    ]
  },
  engineer: {
    id: 'energy-mission',
    title: '⚡ Энергопотребление Арктики',
    description: 'Рассчитайте рост энергопотребления и его влияние',
    icon: 'Zap',
    color: 'blue',
    tasks: [
      { question: 'Энергопотребление в 2000 году (ТВт·ч)?', answer: '10.2', unit: 'ТВт·ч' },
      { question: 'Энергопотребление в 2025 году (ТВт·ч)?', answer: '12.4', unit: 'ТВт·ч' }
    ]
  },
  journalist: {
    id: 'people-mission',
    title: '👥 Население Арктики',
    description: 'Исследуйте демографические изменения в регионе',
    icon: 'Users',
    color: 'purple',
    tasks: [
      { question: 'Население Арктики в 2000 году (млн чел)?', answer: '3.8', unit: 'млн' },
      { question: 'Население Арктики в 2025 году (млн чел)?', answer: '4.0', unit: 'млн' }
    ]
  }
};

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
  const [missionAnswers, setMissionAnswers] = useState({ answer1: '', answer2: '' });
  const [aiChat, setAiChat] = useState(aiMessages);
  const [aiInput, setAiInput] = useState('');
  const [completedMissions, setCompletedMissions] = useState(0);

  const getRoleData = () => {
    const data = climateData.find(d => d.year === selectedYear) || climateData[4];
    switch (character?.role) {
      case 'climatologist':
        return { metric: 'Температура', value: `${data.temp > 0 ? '+' : ''}${data.temp}°C`, trend: '+0.08°C/год' };
      case 'biologist':
        return { metric: 'Популяция медведей', value: `~${(data.bears / 1000).toFixed(1)}k`, trend: '-2.5%/год' };
      case 'engineer':
        return { metric: 'Энергопотребление', value: `${data.energy} ТВт·ч`, trend: '+3.1%/год' };
      case 'journalist':
        return { metric: 'Жителей Арктики', value: `${data.population} млн`, trend: '+0.5%/год' };
      default:
        return { metric: 'Площадь льда', value: `${data.area} млн км²`, trend: '-3.2%/год' };
    }
  };

  const getRoleGraphData = () => {
    if (!character?.role) return climateData.map(d => d.area);
    
    switch (character.role) {
      case 'climatologist':
        return climateData.map(d => d.temp + 2);
      case 'biologist':
        return climateData.map(d => d.bears / 1000);
      case 'engineer':
        return climateData.map(d => d.energy);
      case 'journalist':
        return climateData.map(d => d.population);
      default:
        return climateData.map(d => d.area);
    }
  };

  const getCurrentMission = () => {
    if (!character?.role) return null;
    return roleMissions[character.role];
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
    if (q.includes('энерг') || q.includes('электр')) {
      return 'Энергопотребление в Арктике растёт на 3.1% в год из-за развития промышленности и увеличения населённых пунктов. В 2025 году это 12.4 ТВт·ч.';
    }
    if (q.includes('люд') || q.includes('населен')) {
      return 'Население Арктики составляет около 4 млн человек. Основные жители — коренные народы (инуиты, саамы) и работники промышленных объектов.';
    }
    return 'Интересный вопрос! Попробуй переключить временные слои на карте или начни миссию для более детального изучения темы твоей роли.';
  };

  const calculateMissionResult = () => {
    const mission = getCurrentMission();
    if (!mission) return { correct: false, message: 'Миссия не найдена' };
    
    const ans1 = parseFloat(missionAnswers.answer1);
    const ans2 = parseFloat(missionAnswers.answer2);
    
    if (!ans1 || !ans2) return { correct: false, message: 'Введите оба значения' };
    
    const correctAns1 = parseFloat(mission.tasks[0].answer);
    const correctAns2 = parseFloat(mission.tasks[1].answer);
    
    const diff1 = Math.abs(ans1 - correctAns1);
    const diff2 = Math.abs(ans2 - correctAns2);
    
    const tolerance = correctAns1 > 100 ? 100 : 0.5;
    
    if (diff1 < tolerance && diff2 < tolerance) {
      const rate = Math.abs((ans2 - ans1) / 25);
      return { 
        correct: true, 
        message: 'Отлично! Ты точно определил значения.',
        rate: rate.toFixed(4),
        change: (ans2 - ans1).toFixed(2)
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

  const roleData = getRoleData();
  const currentRole = roles.find(r => r.id === character?.role);
  const currentData = climateData.find(d => d.year === selectedYear) || climateData[4];
  const graphData = getRoleGraphData();
  const maxGraphValue = Math.max(...graphData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50 animate-slide-in-left shadow-sm">
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
                ИИ
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
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in shadow-md" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ТЕКУЩИЙ ГОД</CardDescription>
                  <CardTitle className="text-3xl font-mono">{selectedYear}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in shadow-md" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">{roleData.metric.toUpperCase()}</CardDescription>
                  <CardTitle className="text-3xl font-mono">{roleData.value}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{roleData.trend}</p>
                </CardHeader>
              </Card>
              <Card className="border-blue-200 hover:shadow-lg transition-all animate-scale-in shadow-md" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ПЛОЩАДЬ ЛЬДА</CardDescription>
                  <CardTitle className="text-3xl font-mono">{currentData.area} млн км²</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">-{((14.8 - currentData.area) / 14.8 * 100).toFixed(1)}% с 1925</p>
                </CardHeader>
              </Card>
            </div>

            <Card className={`border-2 ${currentRole?.borderColor} animate-slide-in-right shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" size={20} />
                  Интерактивная карта Арктики
                </CardTitle>
                <CardDescription>Временные слои и данные мониторинга</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="data" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="data" className="text-xs">Данные роли</TabsTrigger>
                    <TabsTrigger value="ice" className="text-xs">Морской лёд</TabsTrigger>
                    <TabsTrigger value="temp" className="text-xs">Температура</TabsTrigger>
                    <TabsTrigger value="animals" className="text-xs">Животные</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="data" className="mt-6">
                    <div className={`relative bg-gradient-to-br ${currentRole?.bgColor || 'from-blue-100 to-cyan-100'} rounded-lg p-8 border-2 ${currentRole?.borderColor}`}>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          {currentRole && <Icon name={currentRole.icon as any} size={24} />}
                          График: {roleData.metric}
                        </h3>
                        <p className="text-sm text-muted-foreground">Динамика изменений с 1925 по 2050 год</p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                        <div className="h-64 flex items-end justify-around gap-2">
                          {graphData.map((value, idx) => {
                            const heightPercent = (value / maxGraphValue) * 100;
                            const data = climateData[idx];
                            return (
                              <div key={data.year} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full">
                                  <div 
                                    className={`w-full ${currentRole?.color || 'bg-blue-500'} rounded-t transition-all hover:opacity-80 cursor-pointer animate-scale-in relative`}
                                    style={{ 
                                      height: `${Math.max(heightPercent * 2.5, 20)}px`,
                                      animationDelay: `${idx * 100}ms`
                                    }}
                                  >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {value.toFixed(1)}
                                    </div>
                                  </div>
                                </div>
                                <span className={`text-xs font-mono mt-2 ${selectedYear === data.year ? 'font-bold text-blue-600' : ''}`}>
                                  {data.year}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ice" className="mt-6">
                    <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-8 border-2 border-blue-300">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Snowflake" size={24} />
                          График: Площадь морского льда
                        </h3>
                        <p className="text-sm text-muted-foreground">Сокращение ледяного покрова Арктики</p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                        <div className="h-64 flex items-end justify-around gap-2">
                          {climateData.map((d, idx) => {
                            const heightPercent = (d.area / 15) * 100;
                            return (
                              <div key={d.year} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full">
                                  <div 
                                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t transition-all hover:from-blue-600 hover:to-cyan-500 cursor-pointer animate-scale-in relative"
                                    style={{ 
                                      height: `${heightPercent * 2.5}px`,
                                      animationDelay: `${idx * 100}ms`
                                    }}
                                  >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {d.area} млн км²
                                    </div>
                                  </div>
                                </div>
                                <span className={`text-xs font-mono mt-2 ${selectedYear === d.year ? 'font-bold text-blue-600' : ''}`}>
                                  {d.year}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="temp" className="mt-6">
                    <div className="relative bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-8 border-2 border-red-300">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Thermometer" size={24} />
                          График: Температурные аномалии
                        </h3>
                        <p className="text-sm text-muted-foreground">Отклонение от базового периода</p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                        <div className="h-64 flex items-end justify-around gap-2">
                          {climateData.map((d, idx) => {
                            const adjustedTemp = d.temp + 2;
                            const heightPercent = (adjustedTemp / 4) * 100;
                            return (
                              <div key={d.year} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full">
                                  <div 
                                    className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t transition-all hover:from-orange-600 hover:to-red-600 cursor-pointer animate-scale-in relative"
                                    style={{ 
                                      height: `${Math.max(heightPercent * 2.5, 20)}px`,
                                      animationDelay: `${idx * 100}ms`
                                    }}
                                  >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {d.temp > 0 ? '+' : ''}{d.temp}°C
                                    </div>
                                  </div>
                                </div>
                                <span className={`text-xs font-mono mt-2 ${selectedYear === d.year ? 'font-bold text-red-600' : ''}`}>
                                  {d.year}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="animals" className="mt-6">
                    <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-8 border-2 border-green-300">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Beef" size={24} />
                          График: Популяция белых медведей
                        </h3>
                        <p className="text-sm text-muted-foreground">Изменение численности популяции</p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                        <div className="h-64 flex items-end justify-around gap-2">
                          {climateData.map((d, idx) => {
                            const heightPercent = (d.bears / 25000) * 100;
                            return (
                              <div key={d.year} className="flex-1 flex flex-col items-center group">
                                <div className="relative w-full">
                                  <div 
                                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t transition-all hover:from-green-600 hover:to-emerald-500 cursor-pointer animate-scale-in relative"
                                    style={{ 
                                      height: `${heightPercent * 2.5}px`,
                                      animationDelay: `${idx * 100}ms`
                                    }}
                                  >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {d.bears.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                                <span className={`text-xs font-mono mt-2 ${selectedYear === d.year ? 'font-bold text-green-600' : ''}`}>
                                  {d.year}
                                </span>
                              </div>
                            );
                          })}
                        </div>
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
                    {climateData.map((data) => (
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
            <Card className={`border-2 ${currentRole?.borderColor} animate-slide-in-left shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" size={24} />
                  Миссии для роли: {currentRole?.title}
                </CardTitle>
                <CardDescription>Специальные задания для твоей специализации</CardDescription>
              </CardHeader>
            </Card>

            {character?.role && (
              <div className="max-w-2xl mx-auto">
                <Card className={`border-2 ${currentRole?.borderColor} hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`${currentRole?.color} p-3 rounded-lg animate-float shadow-lg`}>
                        <Icon name={roleMissions[character.role].icon as any} className="text-white" size={32} />
                      </div>
                      <Badge className={`bg-gradient-to-r ${currentRole?.bgColor} ${currentRole?.borderColor} border-2`}>
                        МИССИЯ #{1}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{roleMissions[character.role].title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {roleMissions[character.role].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className={`bg-gradient-to-br ${currentRole?.bgColor} p-6 rounded-lg border-2 ${currentRole?.borderColor}`}>
                        <div className="font-mono text-sm mb-3 font-semibold">ЗАДАЧИ АНАЛИЗА</div>
                        <div className="space-y-2">
                          {roleMissions[character.role].tasks.map((task, idx) => (
                            <div key={idx} className="flex justify-between text-sm bg-white/50 p-2 rounded">
                              <span>Задача {idx + 1}:</span>
                              <span className="font-mono font-semibold">{task.question}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full" size="lg" onClick={() => setMissionStep('task1')}>
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать миссию
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {currentSection === 'missions' && missionStep === 'task1' && character?.role && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Button variant="ghost" className="mb-4" onClick={() => setMissionStep('intro')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К списку миссий
            </Button>
            
            <Card className={`border-2 ${currentRole?.borderColor} animate-scale-in shadow-xl`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name={roleMissions[character.role].icon as any} className={`text-${roleMissions[character.role].color}-500`} size={28} />
                      {roleMissions[character.role].title}
                    </CardTitle>
                    <CardDescription className="mt-2">Шаг 1 из 1</CardDescription>
                  </div>
                  <Badge className={`bg-gradient-to-r ${currentRole?.bgColor} ${currentRole?.borderColor} border-2`}>
                    В процессе
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`bg-gradient-to-br ${currentRole?.bgColor} p-6 rounded-lg border-2 ${currentRole?.borderColor} animate-slide-in-left`}>
                  <h3 className="font-semibold text-lg mb-3">📊 Изучите график и ответьте на вопросы</h3>
                  <p className="mb-4">
                    Проанализируйте данные на графике и определите значения для указанных лет.
                  </p>
                  
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg mb-4">
                    <div className="h-48 flex items-end justify-around gap-2">
                      {graphData.map((value, idx) => {
                        const heightPercent = (value / maxGraphValue) * 100;
                        const data = climateData[idx];
                        return (
                          <div key={data.year} className="flex-1 flex flex-col items-center group">
                            <div className="relative w-full">
                              <div 
                                className={`w-full ${currentRole?.color} rounded-t transition-all hover:opacity-80 cursor-pointer animate-scale-in relative`}
                                style={{ 
                                  height: `${Math.max(heightPercent * 1.8, 20)}px`,
                                  animationDelay: `${idx * 100}ms`
                                }}
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {value.toFixed(1)}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-mono mt-2">{data.year}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="answer1">{roleMissions[character.role].tasks[0].question}</Label>
                      <Input 
                        id="answer1"
                        type="number"
                        step="0.1"
                        placeholder={roleMissions[character.role].tasks[0].unit}
                        value={missionAnswers.answer1}
                        onChange={(e) => setMissionAnswers({...missionAnswers, answer1: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="answer2">{roleMissions[character.role].tasks[1].question}</Label>
                      <Input 
                        id="answer2"
                        type="number"
                        step="0.1"
                        placeholder={roleMissions[character.role].tasks[1].unit}
                        value={missionAnswers.answer2}
                        onChange={(e) => setMissionAnswers({...missionAnswers, answer2: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setMissionStep('result')}
                  disabled={!missionAnswers.answer1 || !missionAnswers.answer2}
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
            <Card className={`border-2 ${currentRole?.borderColor} animate-scale-in shadow-xl`}>
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
                          <div className={`bg-gradient-to-br ${currentRole?.bgColor} p-6 rounded-lg border-2 ${currentRole?.borderColor} animate-slide-in-right`}>
                            <h3 className="font-semibold text-lg mb-4">📈 Итоговые расчёты</h3>
                            <div className="space-y-3 font-mono text-sm">
                              <div className="flex justify-between bg-white/50 p-2 rounded">
                                <span>Изменение (2000-2025):</span>
                                <span className="font-semibold">{result.change}</span>
                              </div>
                              <div className="flex justify-between bg-white/50 p-2 rounded">
                                <span>Скорость изменения в год:</span>
                                <span className="font-semibold text-red-600">{result.rate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200 animate-fade-in">
                            <h3 className="font-semibold text-lg mb-2">🏆 Миссия выполнена!</h3>
                            <p className="text-muted-foreground mb-4">
                              Ты получил бейдж "{currentRole?.title}" и завершил миссию своей роли!
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
                                setMissionAnswers({ answer1: '', answer2: '' });
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
        )}

        {currentSection === 'profile' && character && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className={`border-2 ${currentRole?.borderColor} animate-scale-in shadow-xl`}>
              <CardHeader className={`bg-gradient-to-br ${currentRole?.bgColor} rounded-t-lg`}>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <span className="text-4xl animate-bounce-soft">{character.avatar}</span>
                  {character.name}
                </CardTitle>
                <CardDescription>Профиль исследователя Арктики</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className={`bg-gradient-to-br ${currentRole?.bgColor} p-6 rounded-lg border-2 ${currentRole?.borderColor} shadow-md`}>
                      <Label className="text-sm text-muted-foreground">РОЛЬ</Label>
                      <div className="flex items-center gap-3 mt-3">
                        {currentRole && (
                          <>
                            <div className={`${currentRole.color} p-3 rounded-lg shadow-lg`}>
                              <Icon name={currentRole.icon as any} className="text-white" size={24} />
                            </div>
                            <div>
                              <span className="font-semibold text-lg block">{currentRole.title}</span>
                              <span className="text-xs text-muted-foreground">{currentRole.focus}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300 shadow-md">
                      <Label className="text-sm text-muted-foreground">ВЫПОЛНЕНО МИССИЙ</Label>
                      <p className="text-4xl font-bold text-green-700 mt-3">{completedMissions} / 4</p>
                      <Progress value={(completedMissions / 4) * 100} className="mt-3" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg border-2 border-cyan-300 shadow-md">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Icon name="Award" size={20} />
                      Достижения
                    </h3>
                    <div className="space-y-2">
                      {completedMissions > 0 && currentRole && (
                        <Badge className={`mr-2 ${currentRole.color} text-white animate-scale-in text-base px-3 py-1`}>
                          {currentRole.title === 'Климатолог' && '🌡️ Мастер климата'}
                          {currentRole.title === 'Биолог' && '🐻 Друг медведей'}
                          {currentRole.title === 'Инженер' && '⚡ Энергетик'}
                          {currentRole.title === 'Журналист' && '📰 Хроникёр'}
                        </Badge>
                      )}
                      {completedMissions === 0 && (
                        <p className="text-sm text-muted-foreground">Выполни первую миссию, чтобы получить бейдж!</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300 shadow-md">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="BarChart3" size={20} />
                    Статистика экспедиции
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-3xl font-bold text-blue-700">{completedMissions}</p>
                      <p className="text-xs text-muted-foreground mt-1">Миссий</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-3xl font-bold text-cyan-700">{Math.floor((aiChat.length - 2) / 2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Вопросов ИИ</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-3xl font-bold text-green-700">{completedMissions > 0 ? 1 : 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">Бейджей</p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  onClick={() => {
                    if (confirm('Вы уверены, что хотите создать нового персонажа? Весь прогресс будет утерян.')) {
                      setCharacter(null);
                      setCurrentSection('intro');
                      setCompletedMissions(0);
                      setMissionStep('intro');
                      setMissionAnswers({ answer1: '', answer2: '' });
                      setAiChat(aiMessages);
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
            <Card className="border-blue-200 animate-slide-in-left shadow-xl">
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
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <Icon name="Target" className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Интерактивные миссии</h4>
                    <p className="text-sm text-muted-foreground">
                      Выполняйте задания по изучению климата
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <Icon name="Map" className="text-cyan-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Временная карта</h4>
                    <p className="text-sm text-muted-foreground">
                      Арктика в разные эпохи (1925-2050)
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <Icon name="Users" className="text-green-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">4 роли персонажей</h4>
                    <p className="text-sm text-muted-foreground">
                      Каждый с уникальным фокусом
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <Icon name="Bot" className="text-purple-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">ИИ-наставник</h4>
                    <p className="text-sm text-muted-foreground">
                      Арктина ответит на вопросы
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-300 animate-slide-in-right shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-lg shadow-lg">
                      <Icon name="Send" className="text-white" size={28} />
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
                        <Button className="shadow-lg">
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
