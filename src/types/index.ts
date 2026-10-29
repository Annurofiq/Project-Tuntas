// ============================================================
// TUNTAS — Core Types
// ============================================================

export type UserRole = 'requester' | 'provider' | 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  location: string;
  city: string;
  province: string;
  about: string;
  skills: string[];
  rating: number;
  totalReviews: number;
  totalTransactions: number;
  completedJobs: number;
  successRate: number;
  responseRate: number;
  responseTime: string;
  memberSince: string;
  isVerified: boolean;
  isOnline: boolean;
  balance: number;
  roles: UserRole[];
}

export type JobType = 'online' | 'on-site' | 'both';
export type BudgetType = 'fixed' | 'range' | 'negotiable';
export type GigStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  province: string;
  jobType: JobType;
  budgetType: BudgetType;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  requiredSkills: string[];
  deliverables: string[];
  evidenceRequired: boolean;
  status: GigStatus;
  requesterId: string;
  requester: User;
  proposalCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Proposal {
  id: string;
  gigId: string;
  gig?: Gig;
  providerId: string;
  provider: User;
  price: number;
  estimasi: string;
  message: string;
  experience: string;
  attachments?: string[];
  status: ProposalStatus;
  createdAt: string;
}

export type OrderStatus =
  | 'WAITING_PAYMENT'
  | 'FUNDED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'REVISION_REQUESTED'
  | 'COMPLETED'
  | 'RELEASED'
  | 'DISPUTED'
  | 'CANCELLED';

export type MilestoneStatus = 'pending' | 'in_progress' | 'submitted' | 'approved' | 'revision';

export interface Milestone {
  id: string;
  orderId: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  status: MilestoneStatus;
  deliverable?: string;
  submittedAt?: string;
  approvedAt?: string;
}

export interface Order {
  id: string;
  gigId: string;
  gig: Gig;
  proposalId: string;
  proposal: Proposal;
  requesterId: string;
  requester: User;
  providerId: string;
  provider: User;
  title: string;
  description: string;
  price: number;
  deadline: string;
  scope: string;
  deliverables: string[];
  status: OrderStatus;
  milestones?: Milestone[];
  hasMilestone: boolean;
  escrowAmount: number;
  platformFee: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  submission?: Submission;
}

export interface Submission {
  id: string;
  orderId: string;
  message: string;
  text?: string;
  images?: string[];
  links?: string[];
  files?: string[];
  notes?: string;
  submittedAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  fromUserId: string;
  fromUser: User;
  toUserId: string;
  toUser: User;
  rating: number;
  comment: string;
  tags: string[];
  createdAt: string;
}

// ============================================================
// PASAR / MARKETPLACE
// ============================================================

export type ItemCondition = 'new' | 'used';
export type ListingStatus = 'active' | 'sold' | 'inactive';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: ItemCondition;
  price: number;
  isNegotiable: boolean;
  images: string[];
  location: string;
  city: string;
  province: string;
  shippingAvailable: boolean;
  stock: number;
  status: ListingStatus;
  sellerId: string;
  seller: User;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export type PurchaseStatus =
  | 'WAITING_PAYMENT'
  | 'PAID'
  | 'SHIPPED'
  | 'RECEIVED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface Purchase {
  id: string;
  listingId: string;
  listing: Listing;
  buyerId: string;
  buyer: User;
  sellerId: string;
  seller: User;
  price: number;
  status: PurchaseStatus;
  shippingAddress?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// CHAT
// ============================================================

export type MessageType = 'text' | 'image' | 'file' | 'system' | 'proposal' | 'offer';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender?: User;
  type: MessageType;
  content: string;
  metadata?: {
    proposalId?: string;
    amount?: number;
    action?: string;
  };
  isRead: boolean;
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  relatedGigId?: string;
  relatedGig?: Gig;
  relatedListingId?: string;
  relatedListing?: Listing;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// NOTIFICATION
// ============================================================

export type NotificationType =
  | 'new_proposal'
  | 'proposal_accepted'
  | 'proposal_rejected'
  | 'new_message'
  | 'payment'
  | 'order_status'
  | 'submission'
  | 'revision'
  | 'completed'
  | 'review'
  | 'dispute'
  | 'marketplace_offer'
  | 'purchase'
  | 'shipping';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ============================================================
// DISPUTE
// ============================================================

export type DisputeStatus = 'open' | 'under_review' | 'resolved_requester' | 'resolved_provider' | 'closed';

export interface Dispute {
  id: string;
  orderId: string;
  order: Order;
  openedById: string;
  openedBy: User;
  reason: string;
  description: string;
  evidence?: string[];
  status: DisputeStatus;
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

// ============================================================
// ARTICLE
// ============================================================

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
}

// ============================================================
// WALLET / TRANSACTION
// ============================================================

export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  referenceId?: string;
  createdAt: string;
}

// ============================================================
// CATEGORY
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  type: 'jasa' | 'pasar' | 'both';
  count: number;
}
