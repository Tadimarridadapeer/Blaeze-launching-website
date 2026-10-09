export const subscribeEmail = async (email) => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('Subscription API error:', error);
    return {
      status: 500,
      data: {
        success: false,
        message: 'Unable to connect to the server. Please check your connection and try again.'
      }
    };
  }
};

export const fetchSiteConfig = async () => {
  try {
    const response = await fetch('/api/config');
    const data = await response.json();
    return data.success ? data.config : null;
  } catch (error) {
    console.warn('Backend config fetch fallback to local defaults:', error);
    return null;
  }
};

export const saveSiteConfig = async (config) => {
  try {
    const response = await fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    return await response.json();
  } catch (error) {
    console.error('Config save error:', error);
    return { success: false, message: 'Failed to update config' };
  }
};

export const fetchSubscribers = async () => {
  try {
    const response = await fetch('/api/subscribers');
    return await response.json();
  } catch {
    return { success: false, totalSubscribers: 0, subscribers: [] };
  }
};
