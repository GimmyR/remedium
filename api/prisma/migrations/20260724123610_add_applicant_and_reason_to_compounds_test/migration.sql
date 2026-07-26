-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compound" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "unit" VARCHAR,
    "min" DOUBLE PRECISION,
    "max" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "compound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compounds_test" (
    "id" SERIAL NOT NULL,
    "testDate" TIMESTAMPTZ(6) NOT NULL,
    "applicant" VARCHAR(100) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "compounds_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_detail" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "compoundId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "test_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AccountToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- CreateIndex
CREATE INDEX "_AccountToRole_B_index" ON "_AccountToRole"("B");

-- AddForeignKey
ALTER TABLE "test_detail" ADD CONSTRAINT "test_detail_testId_fkey" FOREIGN KEY ("testId") REFERENCES "compounds_test"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_detail" ADD CONSTRAINT "test_detail_compoundId_fkey" FOREIGN KEY ("compoundId") REFERENCES "compound"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
