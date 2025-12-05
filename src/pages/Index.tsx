import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Role = 'climatologist' | 'biologist' | 'engineer' | 'journalist' | null;
type Section = 'intro' | 'map' | 'missions' | 'about';

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

const iceData = [
  { year: 1925, area: 14.8, temp: -0.2 },
  { year: 1950, area: 14.5, temp: -0.1 },
  { year: 1975, area: 14.2, temp: 0.0 },
  { year: 2000, area: 13.1, temp: 0.4 },
  { year: 2025, area: 11.8, temp: 1.1 },
  { year: 2050, area: 9.2, temp: 2.0 }
];

export default function Index() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [selectedYear, setSelectedYear] = useState(2025);

  const getRoleData = () => {
    switch (selectedRole) {
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

  if (currentSection === 'intro' && !selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-white/80 rounded-full border border-blue-200">
              <Icon name="Snowflake" className="text-cyan-600" size={20} />
              <span className="font-mono text-sm text-blue-900 tracking-wider">ARCTIC CHRONICLE PROJECT</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-950 mb-4">
              Ледяной Хроникер
            </h1>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Путешествие сквозь время Арктики
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {roles.map((role, idx) => (
              <Card 
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-400"
                onClick={() => {
                  setSelectedRole(role.id);
                  setCurrentSection('map');
                }}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`${role.color} p-3 rounded-lg`}>
                      <Icon name={role.icon as any} className="text-white" size={24} />
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">РОЛЬ #{idx + 1}</Badge>
                  </div>
                  <CardTitle className="text-2xl mt-4">{role.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{role.focus}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-blue-600 font-mono">Выберите роль для начала экспедиции</p>
          </div>
        </div>
      </div>
    );
  }

  const roleData = getRoleData();
  const currentRole = roles.find(r => r.id === selectedRole);
  const currentData = iceData.find(d => d.year === selectedYear) || iceData[4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="Snowflake" className="text-cyan-600" size={24} />
              <span className="font-bold text-blue-950 text-lg">Ледяной Хроникер</span>
              {currentRole && (
                <Badge className={`${currentRole.color} text-white border-0`}>
                  {currentRole.title}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant={currentSection === 'map' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('map')}
              >
                <Icon name="Map" size={16} className="mr-1" />
                Карта
              </Button>
              <Button 
                variant={currentSection === 'missions' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('missions')}
              >
                <Icon name="Target" size={16} className="mr-1" />
                Миссии
              </Button>
              <Button 
                variant={currentSection === 'about' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentSection('about')}
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
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ТЕКУЩИЙ ГОД</CardDescription>
                  <CardTitle className="text-3xl font-mono">{selectedYear}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">{roleData.metric}</CardDescription>
                  <CardTitle className="text-3xl font-mono">{roleData.value}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{roleData.trend}</p>
                </CardHeader>
              </Card>
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardDescription className="font-mono text-xs">ПЛОЩАДЬ ЛЬДА</CardDescription>
                  <CardTitle className="text-3xl font-mono">{currentData.area} млн км²</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">-{((14.8 - currentData.area) / 14.8 * 100).toFixed(1)}% с 1925</p>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-blue-200">
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
                    <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-blue-300">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                      <div className="relative text-center">
                        <Icon name="Snowflake" size={64} className="text-blue-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-lg font-semibold text-blue-900">Карта морского льда</p>
                        <p className="text-sm text-blue-700 font-mono mt-2">Год: {selectedYear}</p>
                        <p className="text-sm text-blue-700 font-mono">Покрытие: {currentData.area} млн км²</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="temp" className="mt-6">
                    <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-red-300">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                      <div className="relative text-center">
                        <Icon name="Thermometer" size={64} className="text-red-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-red-900">Температурные аномалии</p>
                        <p className="text-sm text-red-700 font-mono mt-2">Год: {selectedYear}</p>
                        <p className="text-sm text-red-700 font-mono">Аномалия: {currentData.temp > 0 ? '+' : ''}{currentData.temp}°C</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="animals" className="mt-6">
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-green-300">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                      <div className="relative text-center">
                        <Icon name="Beef" size={64} className="text-green-600 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-green-900">Популяции животных</p>
                        <p className="text-sm text-green-700 mt-2">🐻 Белые медведи • 🦭 Моржи • 🐟 Тюлени</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="human" className="mt-6">
                    <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-8 h-96 flex items-center justify-center border-2 border-purple-300">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                      <div className="relative text-center">
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
                        className="flex-1 font-mono text-xs"
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

        {currentSection === 'missions' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" size={24} />
                  Миссии исследователя
                </CardTitle>
                <CardDescription>Интерактивные кейсы для изучения Арктики</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-blue-500 p-3 rounded-lg">
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
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Прогноз «льда-нуля»:</span>
                          <span className="font-mono text-orange-600">~2252 год</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="Play" size={16} className="mr-2" />
                      Начать миссию
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-300 hover:shadow-lg transition-all opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Icon name="Beef" className="text-white" size={24} />
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 border-gray-300">СКОРО</Badge>
                  </div>
                  <CardTitle className="text-xl">🐻 Медвежий след</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Анализируйте миграцию белых медведей и определите опасные зоны
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" disabled>
                    <Icon name="Lock" size={16} className="mr-2" />
                    Заблокировано
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-cyan-300 hover:shadow-lg transition-all opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-cyan-500 p-3 rounded-lg">
                      <Icon name="Search" className="text-white" size={24} />
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 border-gray-300">СКОРО</Badge>
                  </div>
                  <CardTitle className="text-xl">🌐 Сигнал из прошлого</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Расшифруйте данные ледяных кернов и свяжите их с промышленными эпохами
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" disabled>
                    <Icon name="Lock" size={16} className="mr-2" />
                    Заблокировано
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-300 hover:shadow-lg transition-all opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <Icon name="Zap" className="text-white" size={24} />
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 border-gray-300">СКОРО</Badge>
                  </div>
                  <CardTitle className="text-xl">⚡ Станция будущего</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Спроектируйте экологичную исследовательскую станцию в Арктике
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

        {currentSection === 'about' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <Card className="border-blue-200">
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
                    и прогнозируя будущие сценарии. Проект сочетает научные данные, визуализацию 
                    и игровую механику для образовательных целей.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Icon name="Target" className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Интерактивные миссии</h4>
                    <p className="text-sm text-muted-foreground">
                      Выполняйте задания по изучению климата, биологии и технологий Арктики
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <Icon name="Map" className="text-cyan-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Временная карта</h4>
                    <p className="text-sm text-muted-foreground">
                      Исследуйте Арктику в разные эпохи с 1925 по 2050 год
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <Icon name="Users" className="text-green-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">4 роли персонажей</h4>
                    <p className="text-sm text-muted-foreground">
                      Климатолог, биолог, инженер или журналист — каждый с уникальным фокусом
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <Icon name="LineChart" className="text-purple-600 mb-2" size={24} />
                    <h4 className="font-semibold mb-2">Научные данные</h4>
                    <p className="text-sm text-muted-foreground">
                      Реальная информация о температуре, льдах, популяциях животных
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-950">Технологии</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui'].map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <Icon name="Rocket" className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Начните своё путешествие</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Выберите роль исследователя и отправляйтесь в экспедицию сквозь время Арктики
                      </p>
                      <Button onClick={() => {
                        setSelectedRole(null);
                        setCurrentSection('intro');
                      }}>
                        <Icon name="User" size={16} className="mr-2" />
                        Выбрать роль
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-white/90 backdrop-blur-sm border-t border-blue-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            ARCTIC CHRONICLE PROJECT © 2025 • Путешествие сквозь время
          </p>
        </div>
      </footer>
    </div>
  );
}
