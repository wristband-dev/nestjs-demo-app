import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('api/v1/token')
export class TokenController {
  @Get()
  getTokenData(@Req() req, @Res() res): Promise<void> {
    const { accessToken, expiresAt } = req.session;

    res.header('Cache-Control', 'no-store');
    res.header('Pragma', 'no-cache');

    try {
      return res.status(200).json({ accessToken, expiresAt });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }
}
