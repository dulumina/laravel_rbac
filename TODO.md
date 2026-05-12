# TODO

## Ant Design + Tailwind integration

- [x] Konfirmasi dependensi AntD dan tambahkan setup style/reset AntD di entrypoint
- [x] Buat wrapper `ConfigProvider` (tema ringan agar match dengan Tailwind/dark mode)
- [x] Bungkus `app` di `resources/js/app.tsx` dengan `ConfigProvider`
- [x] Migrasi sebagian UI: ganti 1 form/modals yang ada (mis. create-team-modal atau invite-member-modal) dari shadcn → AntD
- [x] Sesuaikan styling agar tidak bentrok dengan komponen shadcn yang masih dipakai
- [x] Jalankan `npm run dev` dan cek UI (modal, input, tombol)
- [x] Jalankan lint/typescheck
