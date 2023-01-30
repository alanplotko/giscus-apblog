-- CreateTable
CREATE TABLE "installation_access_tokens" (
    "installation_id" BIGINT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "installation_access_tokens_pkey" PRIMARY KEY ("installation_id")
);
