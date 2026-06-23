import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  Folder,
  Gauge,
  Image as ImageIcon,
  Clock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
          className="flex items-center gap-3 px-2 py-3 text-sidebar-foreground transition-opacity hover:opacity-80"
        >
          {collapsed ? (
            <div className="flex h-8 w-8 items-center justify-center">
              <img
                src="/logo-grupo-csv.png"
                alt="Grupo CSV"
                className="h-6 w-auto object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src="/logo-grupo-csv.png"
                alt="Grupo CSV"
                className="h-7 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  CMS
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Portal Interno
                </span>
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Diretorio</SidebarGroupLabel>
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

      <SidebarFooter>
        {!collapsed && (
          <div className="border-t border-sidebar-border px-3 py-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Grupo CSV &middot; Thera Tech
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
