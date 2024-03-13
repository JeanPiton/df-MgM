import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.company.deleteMany();
}