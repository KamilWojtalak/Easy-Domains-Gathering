import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Folder {
    id: number;
    name: string;
    domains_count?: number;
    domains?: Domain[];
    created_at: string;
    updated_at: string;
}

export interface Domain {
    id: number;
    folder_id: number;
    original_url: string;
    normalized_domain: string;
    created_at: string;
    updated_at: string;
}

export interface DuplicateDomain {
    attempted: string;
    existing: string;
    normalized: string;
}

export interface PageProps {
    flash?: {
        type: 'success' | 'error';
        message: string;
        addedDomains?: string[];
        duplicates?: DuplicateDomain[];
    };
}
