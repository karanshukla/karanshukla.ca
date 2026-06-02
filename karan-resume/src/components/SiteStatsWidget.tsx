import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SpeedIcon from '@mui/icons-material/Speed';
import statsData from '../data/stats.json';

type ScoreColor = 'success' | 'warning' | 'error';

function scoreColor(val: number, high = 90, mid = 70): ScoreColor {
  if (val >= high) return 'success';
  if (val >= mid) return 'warning';
  return 'error';
}

function lcpColor(ms: number): ScoreColor {
  if (ms <= 2500) return 'success';
  if (ms <= 4000) return 'warning';
  return 'error';
}

function timeAgo(isoString: string): string {
  const days = Math.floor((Date.now() - new Date(isoString).getTime()) / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

const isPending = statsData.coverage.lines === 0 && statsData.lighthouse.accessibility === 0;

interface StatRowProps {
  label: string;
  sublabel?: string;
  value: number;
  displayValue: string;
  color: ScoreColor;
  tooltip?: string;
  children?: React.ReactNode;
}

function StatRow({ label, sublabel, value, displayValue, color, tooltip, children }: StatRowProps) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.4 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          {sublabel && (
            <Typography variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
              {sublabel}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 700 }} color={`${color}.main`}>
          {displayValue}
        </Typography>
      </Box>
      <Tooltip title={tooltip ?? ''} disableHoverListener={!tooltip}>
        <LinearProgress
          variant="determinate"
          value={value}
          color={color}
          sx={{ height: 3, borderRadius: 2, cursor: tooltip ? 'default' : undefined }}
        />
      </Tooltip>
      {children}
    </Box>
  );
}

interface SiteStatsWidgetProps {
  open: boolean;
}

function SiteStatsWidget({ open }: SiteStatsWidgetProps) {
  const { coverage, lighthouse, generatedAt } = statsData;

  if (!open) {
    if (isPending) return null;
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
        <Tooltip title={`coverage ${coverage.lines}%`} placement="right">
          <DataUsageIcon sx={{ fontSize: 20, color: `${scoreColor(coverage.lines)}.main` }} />
        </Tooltip>
        <Tooltip title={`accessibility ${lighthouse.accessibility}`} placement="right">
          <AccessibilityNewIcon sx={{ fontSize: 20, color: `${scoreColor(lighthouse.accessibility)}.main` }} />
        </Tooltip>
        <Tooltip title={`performance ${lighthouse.performance}`} placement="right">
          <SpeedIcon sx={{ fontSize: 20, color: `${scoreColor(lighthouse.performance)}.main` }} />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.6rem', display: 'block', mb: 1.25 }}
      >
        site stats
      </Typography>

      {isPending ? (
        <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
          pending first run
        </Typography>
      ) : (
        <>
          <StatRow
            label="code coverage"
            value={coverage.lines}
            displayValue={`${coverage.lines}%`}
            color={scoreColor(coverage.lines)}
            tooltip={`statements ${coverage.statements}% · branches ${coverage.branches}% · functions ${coverage.functions}%`}
          />

          <StatRow
            label="accessibility"
            sublabel="wcag 2.2"
            value={lighthouse.accessibility}
            displayValue={`${lighthouse.accessibility}`}
            color={scoreColor(lighthouse.accessibility)}
          />

          <StatRow
            label="performance"
            value={lighthouse.performance}
            displayValue={`${lighthouse.performance}`}
            color={scoreColor(lighthouse.performance)}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="caption" color="text.secondary">
                  largest contentful paint
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }} color={`${lcpColor(lighthouse.lcp)}.main`}>
                  {(lighthouse.lcp / 1000).toFixed(1)}s
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="caption" color="text.secondary">
                  cumulative layout shift
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600 }}
                  color={lighthouse.cls <= 0.1 ? 'success.main' : lighthouse.cls <= 0.25 ? 'warning.main' : 'error.main'}
                >
                  {lighthouse.cls.toFixed(3)}
                </Typography>
              </Box>
            </Box>
          </StatRow>
        </>
      )}

      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5, fontSize: '0.6rem' }}>
        updated {timeAgo(generatedAt)}
      </Typography>
    </Box>
  );
}

export default SiteStatsWidget;
