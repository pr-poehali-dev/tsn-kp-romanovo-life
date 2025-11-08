import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: string;
  name: string;
  address: string;
  issue: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  date: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      name: "Иванов Петр",
      address: "ул. Лесная, д. 12",
      issue: "Протечка крыши",
      description: "После дождя появилась течь в районе мансарды",
      status: "in_progress",
      date: "2024-11-05"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: Request = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      issue: formData.get("issue") as string,
      description: formData.get("description") as string,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };

    setRequests([...requests, newRequest]);
    setIsDialogOpen(false);
    toast({
      title: "Заявка принята",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  const getStatusBadge = (status: Request["status"]) => {
    const statusMap = {
      pending: { label: "Ожидает", variant: "secondary" as const },
      in_progress: { label: "В работе", variant: "default" as const },
      completed: { label: "Выполнена", variant: "outline" as const }
    };
    return statusMap[status];
  };

  const news = [
    {
      title: "Плановое отключение электроэнергии",
      date: "05.11.2024",
      content: "Уважаемые жители! 10 ноября с 09:00 до 13:00 будет проводиться плановое отключение электроэнергии для профилактических работ."
    },
    {
      title: "Общее собрание собственников",
      date: "01.11.2024",
      content: "Приглашаем всех жителей на общее собрание собственников, которое состоится 15 ноября в 18:00 в здании управляющей компании."
    },
    {
      title: "Благоустройство территории",
      date: "28.10.2024",
      content: "Завершены работы по благоустройству детской площадки. Установлены новые качели и игровой комплекс."
    }
  ];

  const documents = [
    { title: "Устав ТСН", size: "2.5 MB", type: "PDF" },
    { title: "Правила внутреннего распорядка", size: "1.2 MB", type: "PDF" },
    { title: "Тарифы на услуги 2024", size: "0.8 MB", type: "PDF" },
    { title: "Протокол общего собрания", size: "3.1 MB", type: "PDF" }
  ];

  const services = [
    { title: "Управление МКД", description: "Комплексное управление многоквартирным домом", icon: "Building2" },
    { title: "Техническое обслуживание", description: "Плановое и аварийное обслуживание", icon: "Wrench" },
    { title: "Уборка территории", description: "Поддержание чистоты и порядка", icon: "Sparkles" },
    { title: "Благоустройство", description: "Озеленение и обустройство территории", icon: "Trees" }
  ];

  return (
    <div className="min-h-screen bg-background font-['Open_Sans']">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon name="Home" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-['Montserrat'] text-foreground">Романово Лайф</h1>
              <p className="text-xs text-muted-foreground">Управляющая компания</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "home", label: "Главная", icon: "Home" },
              { id: "news", label: "Новости", icon: "Newspaper" },
              { id: "documents", label: "Документы", icon: "FileText" },
              { id: "services", label: "Услуги", icon: "Briefcase" },
              { id: "contacts", label: "Контакты", icon: "Phone" }
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className="gap-2"
                onClick={() => setActiveSection(item.id)}
              >
                <Icon name={item.icon as any} size={16} />
                {item.label}
              </Button>
            ))}
          </nav>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Plus" size={16} />
                Подать заявку
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Подать заявку на обслуживание</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО</Label>
                  <Input id="name" name="name" required placeholder="Иванов Иван Иванович" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" name="address" required placeholder="ул. Лесная, д. 12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue">Тема обращения</Label>
                  <Input id="issue" name="issue" required placeholder="Например: Протечка, Электрика" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание проблемы</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    placeholder="Подробно опишите проблему"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">Отправить заявку</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {activeSection === "home" && (
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
      )}

      {activeSection === "news" && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 font-['Montserrat']">Новости</h2>
            <div className="space-y-6">
              {news.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Icon name="Calendar" size={16} />
                      {item.date}
                    </div>
                    <CardTitle className="font-['Montserrat']">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "documents" && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 font-['Montserrat']">Документы</h2>
            <div className="grid gap-4">
              {documents.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        <Icon name="FileText" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold font-['Montserrat']">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="Download" size={20} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "services" && (
        <section className="py-16">
          <div className="container max-w-6xl">
            <h2 className="text-4xl font-bold mb-8 font-['Montserrat']">Услуги</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Icon name={service.icon as any} size={32} />
                    </div>
                    <CardTitle className="text-2xl font-['Montserrat']">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="gap-2">
                      Подробнее
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "contacts" && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 font-['Montserrat']">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Montserrat']">ТСН КП Романово Лайф</CardTitle>
                  <CardDescription>Управляющая компания</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Адрес офиса</p>
                      <p className="text-sm text-muted-foreground">КП Романово Лайф, ул. Центральная, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@romanovo-life.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Часы работы</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-sm text-muted-foreground">Сб-Вс: выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-['Montserrat']">Аварийная служба</CardTitle>
                  <CardDescription>Круглосуточно</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center p-8 bg-destructive/10 rounded-lg">
                    <div className="text-center">
                      <Icon name="Phone" size={48} className="text-destructive mx-auto mb-4" />
                      <p className="text-2xl font-bold text-destructive">+7 (495) 999-99-99</p>
                      <p className="text-sm text-muted-foreground mt-2">Звоните в любое время</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      При авариях звоните немедленно. Дежурная служба работает 24/7 для решения экстренных вопросов.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 font-['Montserrat']">ТСН КП Романово Лайф</h4>
              <p className="text-sm text-primary-foreground/80">
                Профессиональное управление загородным поселком
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 font-['Montserrat']">Контакты</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>+7 (495) 123-45-67</p>
                <p>info@romanovo-life.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 font-['Montserrat']">Режим работы</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Аварийная служба: 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            © 2024 ТСН КП Романово Лайф. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
