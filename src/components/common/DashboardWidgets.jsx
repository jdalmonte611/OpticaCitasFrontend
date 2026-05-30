import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export function PageHeader({ eyebrow, title, description, actionLabel, actionIcon, onAction }) {
    return (
        <Box
            sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Box>
                {eyebrow && (
                    <Typography sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 800, mb: 0.5 }}>
                        {eyebrow}
                    </Typography>
                )}
                <Typography variant="h3">{title}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14, mt: 0.5 }}>
                    {description}
                </Typography>
            </Box>
            {actionLabel && (
                <Button variant="contained" startIcon={actionIcon} onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}

export function StatCard({ title, value, subtitle, icon, color = '#2f80ed', badge }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                        <Typography sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 900, textTransform: 'uppercase' }}>
                            {title}
                        </Typography>
                        <Typography sx={{ fontSize: 28, fontWeight: 900, color: 'text.primary', lineHeight: 1.2, mt: 1 }}>
                            {value}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: `${color}18`,
                            color,
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }}>
                    {badge && <Chip label={badge} size="small" sx={{ bgcolor: '#dffbe5', color: '#159947', fontWeight: 900 }} />}
                    <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{subtitle}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

export function SectionCard({ title, action, children, sx }) {
    return (
        <Card sx={{ ...sx }}>
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{title}</Typography>
                    {action}
                </Box>
                <Box sx={{ px: 2.5, pb: 2.5 }}>{children}</Box>
            </CardContent>
        </Card>
    );
}

export function StatusPill({ label, tone = 'neutral' }) {
    const colors = {
        success: { bgcolor: '#dffbe5', color: '#159947' },
        warning: { bgcolor: '#fff3cf', color: '#9a6400' },
        danger: { bgcolor: '#ffe3e3', color: '#bd1e1e' },
        info: { bgcolor: '#e4f0ff', color: '#1b65c9' },
        neutral: { bgcolor: '#eef2f6', color: '#5c6b7c' },
    };

    return (
        <Chip
            label={label}
            size="small"
            sx={{
                ...colors[tone],
                borderRadius: 1,
                fontSize: 10,
                fontWeight: 900,
                textTransform: 'uppercase',
            }}
        />
    );
}

export function MiniBars({ values, color = '#9bb6d4' }) {
    const maxValue = Math.max(...values);

    return (
        <Stack direction="row" spacing={0.6} alignItems="flex-end" sx={{ height: 54 }}>
            {values.map((value, index) => (
                <Box
                    key={`${value}-${index}`}
                    sx={{
                        width: 13,
                        height: `${Math.max((value / maxValue) * 100, 18)}%`,
                        bgcolor: color,
                        borderRadius: '5px 5px 0 0',
                    }}
                />
            ))}
        </Stack>
    );
}
