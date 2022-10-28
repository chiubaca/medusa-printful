# https://docs.medusajs.com/api/admin/#tag/App/operation/PostApps


psql -d <DB_NAME> -U <DB_USER>
UPDATE public.user SET api_token='<API_TOKEN>' WHERE email='<USER_EMAIL>';