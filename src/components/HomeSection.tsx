import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

interface Request {
  id: string;
  name: string;
  address: string;
  issue: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  date: string;
}

interface HomeSectionProps {
  requests: Request[];
  setIsDialogOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  getStatusBadge: (status: Request["status"]) => { label: string; variant: "secondary" | "default" | "outline" };
}

const HomeSection = ({ requests, setIsDialogOpen, setActiveSection, getStatusBadge }: HomeSectionProps) => {
  const services = [
    { title: "Управление МКД", description: "Комплексное управление многоквартирным домом", icon: "Building2" },
    { title: "Техническое обслуживание", description: "Плановое и аварийное обслуживание", icon: "Wrench" },
    { title: "Уборка территории", description: "Поддержание чистоты и порядка", icon: "Sparkles" },
    { title: "Благоустройство", description: "Озеленение и обустройство территории", icon: "Trees" }
  ];

  return (
    <>
      <section 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://cdn.poehali.dev/files/ec60391f-aad0-49af-a472-146315d90707.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="container relative flex h-full items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-5xl font-bold mb-4 font-['Montserrat'] animate-fade-in">
              КП Романово Лайф
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Современная управляющая компания для комфортной жизни в загородном поселке
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2" onClick={() => setIsDialogOpen(true)}>
                <Icon name="FileText" size={20} />
                Подать заявку
              </Button>
              <Button size="lg" variant="secondary" className="gap-2" onClick={() => setActiveSection("contacts")}>
                <Icon name="Phone" size={20} />
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <h3 className="text-3xl font-bold mb-8 text-center font-['Montserrat']">Мои заявки</h3>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="FileQuestion" size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">У вас пока нет заявок</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-['Montserrat']">{request.issue}</CardTitle>
                        <CardDescription>{request.address}</CardDescription>
                      </div>
                      <Badge variant={getStatusBadge(request.status).variant}>
                        {getStatusBadge(request.status).label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="User" size={14} />
                        {request.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {new Date(request.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container">
          <h3 className="text-3xl font-bold mb-8 text-center font-['Montserrat']">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon name={service.icon as any} size={24} />
                  </div>
                  <CardTitle className="text-lg font-['Montserrat']">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <h3 className="text-3xl font-bold mb-8 text-center font-['Montserrat']">О поселке</h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              КП Романово Лайф — это современный загородный поселок, расположенный в живописном месте среди 
              лесов и полей. Здесь созданы все условия для комфортной загородной жизни.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="infrastructure">
                <AccordionTrigger className="font-['Montserrat']">Инфраструктура</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Центральные коммуникации
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Асфальтированные дороги
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Детские площадки
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Охраняемая территория
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="location">
                <AccordionTrigger className="font-['Montserrat']">Расположение</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Поселок находится в 35 км от МКАД по Калужскому шоссе. Развитая транспортная инфраструктура 
                    обеспечивает удобную связь с Москвой.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ecology">
                <AccordionTrigger className="font-['Montserrat']">Экология</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Чистый воздух, хвойный лес, живописные поля — идеальное место для жизни на природе 
                    в окружении леса и зелени.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
