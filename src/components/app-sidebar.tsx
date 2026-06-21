import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  Folder,
  Gauge,
  Image as ImageIcon,
  LayoutDashboard,
  Clock,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CATEGORIES, getRecent } from "@/content/deliverables";

const categoryIcons = {
  relatorios: BarChart3,
  dashboards: Gauge,
  documentos: FileText,
  assets: ImageIcon,
} as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const recent = getRecent(4);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center gap-2 px-2 py-2 text-sidebar-foreground"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">CMS · CSV</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                portal interno
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Diretório</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === "/"}>
                  <Link to="/" className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {!collapsed && <span>Todos</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat.id];
                return (
                  <SidebarMenuItem key={cat.id}>
                    <SidebarMenuButton asChild isActive={isActive(cat.path)}>
                      <Link to={cat.path} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {!collapsed && <span>{cat.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              Recentes
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recent.map((d) => (
                  <SidebarMenuItem key={d.slug}>
                    <SidebarMenuButton asChild size="sm">
                      <Link
                        to="/entregaveis/$slug"
                        params={{ slug: d.slug }}
                        className="truncate"
                      >
                        <span className="truncate text-xs">{d.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
