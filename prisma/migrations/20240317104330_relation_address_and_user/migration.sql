-- CreateTable
CREATE TABLE "tbl_address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_address" ADD CONSTRAINT "tbl_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
