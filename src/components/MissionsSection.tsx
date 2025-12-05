import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface MissionsSectionProps {
  missionStep: 'intro' | 'task1' | 'task2' | 'result';
  character: any;
  currentRole: any;
  roleMissions: any;
  graphData: number[];
  maxGraphValue: number;
  climateData: any[];
  missionAnswers: { answer1: string; answer2: string };
  setMissionAnswers: (answers: any) => void;
  setMissionStep: (step: any) => void;
  calculateMissionResult: () => any;
  completedMissions: number;
  setCompletedMissions: (count: number) => void;
  setCurrentSection: (section: any) => void;
}

export default function MissionsSection({
  missionStep,
  character,
  currentRole,
  roleMissions,
  graphData,
  maxGraphValue,
  climateData,
  missionAnswers,
  setMissionAnswers,
  setMissionStep,
  calculateMissionResult,
  completedMissions,
  setCompletedMissions,
  setCurrentSection
}: MissionsSectionProps) {
  if (missionStep === 'intro') {
    return (
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
                      {roleMissions[character.role].tasks.map((task: any, idx: number) => (
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
    );
  }

  if (missionStep === 'task1' && character?.role) {
    return (
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
    );
  }

  if (missionStep === 'result') {
    const result = calculateMissionResult();
    
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Card className={`border-2 ${currentRole?.borderColor} animate-scale-in shadow-xl`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Icon name="CheckCircle" className="text-green-500" size={28} />
              Результат миссии
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
