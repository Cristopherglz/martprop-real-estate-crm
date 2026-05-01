import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Home, Users, BarChart3, MessageSquare,
  Calendar, Settings, PlusCircle, LogOut, Building2, Video,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const main = [
  { to: "/dashboard", label: "Inicio", icon: LayoutDashboard, end: true },
  { to: "/dashboard/propiedades", label: "Propiedades", icon: Home },
  { to: "/reels", label: "Homees", icon: Video },
  { to: "/dashboard/leads", label: "Leads", icon: MessageSquare },
  { to: "/dashboard/agenda", label: "Agenda", icon: Calendar },
  { to: "/dashboard/estadisticas", label: "Estadísticas", icon: BarChart3 },
];

const team = [
  { to: "/dashboard/equipo", label: "Equipo", icon: Users },
  { to: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (to: string, end?: boolean) => end ? pathname === to : pathname.startsWith(to);

  const itemCls = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-smooth",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
    );

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-sidebar-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
            <Building2 className="h-5 w-5" />
          </span>
          {!collapsed && <span className="text-base">MartProp</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50">Panel</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 font-medium">
                  <Link to="/dashboard/publicar">
                    <PlusCircle className="h-4 w-4" />
                    {!collapsed && <span>Publicar propiedad</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {main.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.to} end={item.end} className={itemCls(isActive(item.to, item.end))}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50">Cuenta</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {team.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.to} className={itemCls(isActive(item.to))}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-sm">LM</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Lucía Méndez</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Méndez Propiedades</p>
            </div>
            <Link to="/" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid h-9 w-9 mx-auto place-items-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-sm">LM</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
