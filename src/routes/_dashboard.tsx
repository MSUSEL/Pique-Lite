import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import SideMenu from "../composites/SideMenu";
import { SidebarTrigger } from "../components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useProjects } from "../composites/FileUploader/hooks/use-projects";
import { Toaster } from "@/components/ui/sonner";

type BreadcrumbSegment = {
  text: string;
  isLink: boolean;
  path?: string;
};

type Projects = Record<string, { name: string; versions?: any[] }>;

type SegmentMatcher = {
  matches: (segment: string, path: string[]) => boolean;
  render: (
    segment: string,
    path: string[],
    projects?: Projects
  ) => BreadcrumbSegment;
};

const versionDetailsMatcher: SegmentMatcher = {
  matches: (segment) => segment === "versionDetails",
  render: () => ({
    text: "", // Hide this segment
    isLink: false
  })
};

const overviewMatcher: SegmentMatcher = {
  matches: (segment) => segment === "overview",
  render: () => ({
    text: "Projects",
    isLink: false
  })
};

const settingsMatcher: SegmentMatcher = {
  matches: (segment) => segment === "settings",
  render: () => ({
    text: "Settings",
    isLink: false
  })
};

const projectMatcher: SegmentMatcher = {
  matches: (segment) => segment === "project",
  render: () => ({
    text: "Projects",
    isLink: true,
    path: "/overview"
  })
};

const projectIdMatcher: SegmentMatcher = {
  matches: (segment, path) => {
    // Find the index of "project" in the path
    const projectIndex = path.indexOf("project");
    // Check if this segment comes right after "project"
    return projectIndex !== -1 && path[projectIndex + 1] === segment;
  },
  render: (segment: string, path: string[], projects?: Projects) => ({
    text: projects?.[segment]?.name || segment,
    isLink: true,
    path: `/project/${segment}`
  })
};

const versionMatcher: SegmentMatcher = {
  matches: (segment) => segment === "version",
  render: () => ({
    text: "",
    isLink: false
  })
};

const versionIdMatcher: SegmentMatcher = {
  matches: (segment, path) => {
    // Match version ID (comes after "version" segment)
    const versionIndex = path.indexOf("version");
    return versionIndex !== -1 && path[versionIndex + 1] === segment;
  },
  render: (segment: string, path: string[], projects?: Projects) => {
    // Extract projectId and versionId from path
    const projectIndex = path.indexOf("project");
    const projectId = projectIndex !== -1 ? path[projectIndex + 1] : null;

    if (!projectId || !projects?.[projectId]) {
      return {
        text: segment,
        isLink: false
      };
    }

    const project = projects[projectId];
    const version = project.versions?.find(
      (v: any) => v.versionId === segment
    );

    return {
      text: version?.name || segment,
      isLink: false
    };
  }
};

const defaultMatcher: SegmentMatcher = {
  matches: () => true,
  render: (segment: string, path: string[]) => ({
    text: segment.charAt(0).toUpperCase() + segment.slice(1),
    isLink: true,
    path: `/${path.join("/")}`
  })
};

const matchers: SegmentMatcher[] = [
  versionDetailsMatcher,
  overviewMatcher,
  settingsMatcher,
  projectMatcher,
  projectIdMatcher,
  versionMatcher,
  versionIdMatcher,
  defaultMatcher
];

function findMatcher(segment: string, path: string[]): SegmentMatcher {
  return (
    matchers.find((matcher) => matcher.matches(segment, path)) || defaultMatcher
  );
}

function DashboardBreadcrumbs() {
  const location = useLocation();
  const { projects } = useProjects();
  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbSegments = segments
    .map((segment, index) => {
      const currentPath = segments.slice(0, index + 1);
      const matcher = findMatcher(segment, currentPath);
      return matcher.render(segment, currentPath, projects);
    })
    .filter((segment) => segment.text !== ""); // Filter out empty segments

  // Don't show breadcrumbs if there are no segments
  if (breadcrumbSegments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {segment.isLink ? (
                <BreadcrumbLink asChild>
                  <Link to={segment.path!}>{segment.text}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{segment.text}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <SideMenu />
        <main
          style={{
            width: "calc(100vw - var(--sidebar-width))"
          }}
        >
          <div className="flex items-center gap-4 border-b-[0.5px] border-gray-200 px-4 py-2">
            <SidebarTrigger />
            <DashboardBreadcrumbs />
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
