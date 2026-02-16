# Jobzen Frontend

Modern workforce management platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful gradient-based design with smooth animations
- **Role-Based Dashboards**: Separate dashboards for 5 user roles (Admin, Employer, Worker, Client, Partner)
- **Authentication**: Complete auth system with JWT tokens and automatic refresh
- **Protected Routes**: Middleware-based route protection with role-based access control
- **Responsive Design**: Mobile-first responsive layout with modern components
- **State Management**: Zustand with persistent storage
- **Type Safety**: Full TypeScript support with strict mode
- **Component Library**: Reusable UI components with Radix UI primitives

## 📋 Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm/yarn

## 🛠️ Installation

1. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000
NEXT_PUBLIC_APP_NAME=Jobzen
```

3. **Run the development server:**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
jobzen-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── admin/             # Admin dashboard
│   │   ├── employer/          # Employer dashboard
│   │   ├── worker/            # Worker dashboard
│   │   ├── client/            # Client dashboard
│   │   ├── partner/           # Partner dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── utils.ts           # Utility functions
│   │   └── api.ts             # API client with interceptors
│   ├── store/
│   │   └── authStore.ts       # Zustand auth store
│   ├── services/
│   │   └── auth.service.ts    # Authentication service
│   ├── types/
│   │   └── auth.ts            # TypeScript types
│   └── middleware.ts          # Route protection middleware
├── public/                     # Static assets
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🎨 UI Components

### Available Components

- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link, gradient)
- **Input**: Form input with focus states
- **Card**: Container with header, content, footer sections
- **Label**: Form labels with Radix UI
- **Avatar**: User avatars with fallback

### Using Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="gradient">Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🔐 Authentication

### Login Flow

```tsx
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';

const { setAuth } = useAuthStore();

const response = await authService.login({ email, password });
setAuth(response.user, response.access_token, response.refresh_token);
```

### Protected Routes

Routes are automatically protected by middleware. Users without authentication are redirected to `/login`.

Role-specific routes:
- `/admin/*` - Admin only
- `/employer/*` - Employer only
- `/worker/*` - Worker only
- `/client/*` - Client only
- `/partner/*` - Partner only

## 🎭 User Roles

1. **Admin** - Platform management and analytics
2. **Employer** - Post jobs and manage workers
3. **Worker** - Find jobs and track earnings
4. **Client** - Request services and manage providers
5. **Partner** - Provide workers and manage contracts

## 🚦 Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type checking
pnpm type-check
```

## 🎯 Key Features by Role

### Admin Dashboard
- User management
- Platform analytics
- Job oversight
- Revenue tracking
- System settings

### Employer Dashboard
- Job posting
- Worker management
- Schedule planning
- Billing and reports

### Worker Dashboard
- Job search
- Schedule management
- Earnings tracking
- Performance metrics

### Client Dashboard
- Service requests
- Provider management
- Invoice tracking
- Payment processing

### Partner Dashboard
- Worker roster
- Contract management
- Revenue analytics
- Client relationships

## 🎨 Theming

The app uses CSS variables for theming. Customize colors in `globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... more variables */
}
```

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔄 State Management

Using Zustand for lightweight state management:

```tsx
import { useAuthStore } from '@/store/authStore';

const { user, isAuthenticated, logout } = useAuthStore();
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build the app
pnpm build

# Start production server
pnpm start
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@jobzen.com or join our Slack channel.

## 🎉 Next Steps

1. **Backend Integration**: Connect to NestJS backend API
2. **Real-time Features**: Implement WebSocket for live updates
3. **Payment Integration**: Add Stripe/PayPal for payments
4. **Analytics**: Integrate analytics and tracking
5. **Testing**: Add unit and integration tests
6. **Documentation**: API documentation with examples

## 📝 Notes

- Make sure to update the `NEXT_PUBLIC_API_URL` in `.env.local` to point to your backend API
- The middleware handles authentication and role-based routing automatically
- All API calls automatically include JWT tokens via Axios interceptors
- Token refresh is handled automatically when tokens expire
