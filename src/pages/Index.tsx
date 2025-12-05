import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import StartScreen from '@/components/StartScreen';
import MapSection from '@/components/MapSection';
import MissionsSection from '@/components/MissionsSection';
import AISection from '@/components/AISection';

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

  if (currentSection === 'start' || (currentSection === 'intro' && !character)) {
    return (
      <StartScreen
        currentSection={currentSection}
        character={character}
        roles={roles}
        avatars={avatars}
        tempName={tempName}
        tempAvatar={tempAvatar}
        tempRole={tempRole}
        setTempName={setTempName}
        setTempAvatar={setTempAvatar}
        setTempRole={setTempRole}
        setCurrentSection={setCurrentSection}
        setCharacter={setCharacter}
      />
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
          <MapSection
            roleData={roleData}
            currentData={currentData}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            climateData={climateData}
            graphData={graphData}
            maxGraphValue={maxGraphValue}
            currentRole={currentRole}
          />
        )}

        {currentSection === 'missions' && (
          <MissionsSection
            missionStep={missionStep}
            character={character}
            currentRole={currentRole}
            roleMissions={roleMissions}
            graphData={graphData}
            maxGraphValue={maxGraphValue}
            climateData={climateData}
            missionAnswers={missionAnswers}
            setMissionAnswers={setMissionAnswers}
            setMissionStep={setMissionStep}
            calculateMissionResult={calculateMissionResult}
            completedMissions={completedMissions}
            setCompletedMissions={setCompletedMissions}
            setCurrentSection={setCurrentSection}
          />
        )}

        {currentSection === 'ai' && (
          <AISection
            aiChat={aiChat}
            aiInput={aiInput}
            setAiInput={setAiInput}
            handleAiSubmit={handleAiSubmit}
            character={character}
            currentRole={currentRole}
          />
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
