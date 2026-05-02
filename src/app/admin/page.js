import { cookies } from 'next/headers';
import { Container } from '@/components/layout/Container';
import { AdminLoginCard } from '@/components/admin/AdminLoginCard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { buildMetadata } from '@/lib/seo';
import { readStore } from '@/lib/store';
import { isAdminAuthConfigured, isAdminCookieStoreAuthenticated } from '@/lib/admin-auth';

export const metadata = buildMetadata({
  title: 'Admin Paneli',
  description: 'HackFest\'26 hackathon başvurularını görüntüleme ve dışa aktarma paneli.',
  path: '/admin'
});

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = cookies();
  const isAuthenticated = isAdminCookieStoreAuthenticated(cookieStore);

  let submissions = [];
  let projects = [];
  if (isAuthenticated) {
    [submissions, projects] = await Promise.all([
      readStore('hackathon-applications.json'),
      readStore('projects.json')
    ]);

    submissions = [...submissions].sort(
      (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
    );
    projects = [...projects].sort(
      (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
    );
  }

  return (
    <section className="pb-24 pt-32 lg:pb-32 lg:pt-36">
      <Container>
        {isAuthenticated ? (
          <AdminDashboard submissions={submissions} projects={projects} />
        ) : (
          <AdminLoginCard isConfigured={isAdminAuthConfigured()} />
        )}
      </Container>
    </section>
  );
}
