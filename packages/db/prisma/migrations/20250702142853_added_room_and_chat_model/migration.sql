-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "room" (
    "Id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "room_Id_key" ON "room"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "room_slug_key" ON "room"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "chat_id_key" ON "chat"("id");

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
