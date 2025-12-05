import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MapSectionProps {
  roleData: { metric: string; value: string; trend: string };
  currentData: { year: number; area: number; temp: number; bears: number; energy: number; population: number };
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  climateData: Array<{ year: number; area: number; temp: number; bears: number; energy: number; population: number }>;
  graphData: number[];
  maxGraphValue: number;
  currentRole: any;
}

export default function MapSection({
  roleData,
  currentData,
  selectedYear,
  setSelectedYear,
  climateData,
  graphData,
  maxGraphValue,
  currentRole
}: MapSectionProps) {
  return (
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
  );
}
