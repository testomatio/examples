---
url: /
title: Login page
---

To log in, use these credentials:
- Username: `standard_user`
- Password: `secret_sauce`

Other valid usernames for exploring edge cases (all use the same password `secret_sauce`):
- `locked_out_user` — login is blocked; expect an error message
- `problem_user` — UI has intentional bugs (broken images, wrong actions)
- `performance_glitch_user` — pages load slowly
- `error_user` — random errors during checkout
- `visual_user` — visual layout glitches

Form fields:
- Username input: `[data-test="username"]`
- Password input: `[data-test="password"]`
- Login button: `[data-test="login-button"]`

After successful login the user is redirected to `/inventory.html`.
