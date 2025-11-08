import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleSubmitRequest: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Header = ({ 
  activeSection, 
  setActiveSection, 
  isDialogOpen, 
  setIsDialogOpen, 
  handleSubmitRequest 
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
